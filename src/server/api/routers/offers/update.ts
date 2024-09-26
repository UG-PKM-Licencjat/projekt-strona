import { authedProcedure } from "~/server/api/trpc";
import { offers, offerTags, users, tags } from "~/server/db/schema";
import { eq, inArray } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import logEvent, { LogType } from "~/server/log";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const offersSchema = createInsertSchema(offers, {
  files: z.array(
    z.object({ url: z.string(), type: z.string(), name: z.string() }),
  ),
  location: z.object({ x: z.number(), y: z.number() }),
})
  .extend({
    tags: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    ),
  })
  .omit({ userId: true });

const updateProcedure = authedProcedure
  .input(offersSchema)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.session.user.id) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated",
      });
    }

    const userId = ctx.session.user.id;
    const [userIdResult] = await ctx.db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!userIdResult) {
      logEvent({
        message: `User ${userId} does not exist`,
        additionalInfo: JSON.stringify(userIdResult),
        logType: LogType.ERROR,
      });
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User with provided Id does not exist",
      });
    }

    const { tags: selectedTags, ...filteredInput } = input;

    const [offerResult] = await ctx.db
      .select()
      .from(offers)
      .where(eq(offers.userId, userId))
      .limit(1);

    if (!offerResult) {
      logEvent({
        message: `User has not created an offer.`,
        additionalInfo: `User ${userId} tried updating an offer.`,
        logType: LogType.ERROR,
      });
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User has not created an offer.",
      });
    }

    const data = await ctx.db.transaction(async (tx) => {
      const [offerReturned] = await tx
        .update(offers)
        .set(filteredInput)
        .where(eq(offers.id, offerResult.id))
        .returning();

      if (!offerReturned) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update offer",
        });
      }

      const offerId = offerReturned.id;

      const existingTags = await tx
        .select()
        .from(tags)
        .where(
          inArray(
            tags.id,
            selectedTags.map((tag) => tag.id),
          ),
        );

      if (existingTags.length !== selectedTags.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Some tags do not exist in the database",
        });
      }

      const tagsDeleted = await tx
        .delete(offerTags)
        .where(eq(offerTags.offerId, offerId))
        .returning();

      if (tagsDeleted.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Failed to delete tags relation",
        });
      }

      const [tagsReturned] = await tx
        .insert(offerTags)
        .values(selectedTags.map((tag) => ({ offerId, tagId: tag.id })))
        .returning();

      if (!tagsReturned) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to establish tags relation",
        });
      }

      return offerReturned;
    });

    return data;
  });

export default updateProcedure;
