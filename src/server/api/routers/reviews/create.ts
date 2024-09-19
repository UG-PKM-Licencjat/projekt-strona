import { procedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { reviews, users, offers } from "~/server/db/schema";
import { z } from "zod";
import logEvent, { LogType } from "~/server/log";
import { TRPCError } from "@trpc/server";
import { eq, sql } from "drizzle-orm";

const COMMENT_LENGTH = 500;

// TODO: add authorization per user
export const createProcedure = procedure
  .input(
    z.object({
      offerId: z.string(),
      userId: z.string(),
      rating: z.number().min(2).max(10),
      comment: z.string().max(COMMENT_LENGTH).optional(),
    }),
  )
  .mutation(async (opts) => {
    const { input } = opts;
    const { offerId, userId, comment, rating } = input;

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

    const [offerResult] = await db
      .select()
      .from(offers)
      .where(eq(offers.id, offerId))
      .limit(1);

    if (!offerResult) {
      logEvent({
        message: `Offer ${offerId} does not exist`,
        additionalInfo: JSON.stringify(offerResult),
        logType: LogType.ERROR,
      });
      return new TRPCError({
        code: "NOT_FOUND",
        message: "Offer with provided Id does not exist",
      });
    }

    const { ok, data } = await db.transaction(async (tx) => {
      const [returned] = await tx.insert(reviews).values(input).returning();
      if (!returned) {
        tx.rollback();
        return { ok: false, data: null };
      }

      const newRatingsSum = offerResult.ratingsSum
        ? offerResult.ratingsSum + rating
        : rating;

      const [returnedOffer] = await tx
        .update(offers)
        .set({ ratingsSum: newRatingsSum, votes: sql`${offers.votes} + 1` })
        .where(eq(offers.id, offerResult.id))
        .returning();

      if (!returnedOffer) {
        tx.rollback();
        return { ok: false, data: null };
      }

      return { ok: true, data: returned };
    });

    if (!ok) {
      logEvent({
        message: "Failed to create review",
        logType: LogType.ERROR,
      });
      return new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create review",
      });
    }

    logEvent({
      message: "Successfully created a new review",
      additionalInfo: JSON.stringify(data),
      logType: LogType.INFO,
    });

    return data;
  });

export default createProcedure;
