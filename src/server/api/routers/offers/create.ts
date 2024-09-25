import { authedProcedure } from "~/server/api/trpc";
import { offers, offerTags, users, tags } from "~/server/db/schema";
import { eq, inArray } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import logEvent, { LogType } from "~/server/log";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const offersSchema = createInsertSchema(offers, {
  files: z.array(z.object({ url: z.string(), type: z.string() })),
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

const createProcedure = authedProcedure
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

    if (offerResult) {
      logEvent({
        message: `User has already created an offer.`,
        additionalInfo: JSON.stringify(offerResult),
        logType: LogType.ERROR,
      });
      throw new TRPCError({
        code: "CONFLICT",
        message:
          "User has already created an offer. If you want to update it, please use the update endpoint.",
      });
    }

    const { data, error } = await ctx.db.transaction(async (tx) => {
      const [offerReturned] = await tx
        .insert(offers)
        .values({ userId, ...filteredInput})
        .returning();

      if (!offerReturned) {
        tx.rollback();
        return { data: null, error: "Failed to create offer" };
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
        tx.rollback();
        return {
          data: null,
          error: "Some tags do not exist in the database",
        };
      }

      const [tagsReturned] = await tx
        .insert(offerTags)
        .values(selectedTags.map((tag) => ({ offerId, tagId: tag.id })))
        .returning();

      if (!tagsReturned) {
        tx.rollback();
        return { data: null, error: "Failed to establish tags relation" };
      }

      return { data: offerReturned, error: null };
    });

    if (error) {
      logEvent({
        message: error,
        logType: LogType.ERROR,
      });
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error,
      });
    }
    return data;
  });

export default createProcedure;
