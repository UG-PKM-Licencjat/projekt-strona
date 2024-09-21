import { authedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { offers, offerTags, users, tags } from "~/server/db/schema";
import { eq, inArray } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import logEvent, { LogType } from "~/server/log";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const offersSchema = createInsertSchema(offers, {
  files: z.array(z.object({ url: z.string(), type: z.string() })),
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
      return new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated",
      });
    }

    const userId = ctx.session.user.id;
    const [userIdResult] = await db
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
      return new TRPCError({
        code: "NOT_FOUND",
        message: "User with provided Id does not exist",
      });
    }

    const { tags: selectedTags, location, ...filteredInput } = input;

    // UWAGA NIE WIEM CZY OK !
    const parsedLocation = JSON.parse(`${location}`);

    const [offerResult] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (offerResult) {
      logEvent({
        message: `User has already created an offer.`,
        additionalInfo: JSON.stringify(offerResult),
        logType: LogType.ERROR,
      });
      return new TRPCError({
        code: "CONFLICT",
        message:
          "User has already created an offer. If you want to update it, please use the update endpoint.",
      });
    }

    const { data, error } = await db.transaction(async (tx) => {
      const [offerReturned] = await tx
        .insert(offers)
        .values({ userId, location: parsedLocation, ...filteredInput })
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
      return new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error,
      });
    }
    return data;
  });

export default createProcedure;
