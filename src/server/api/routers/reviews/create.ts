import { procedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { reviews, users, offers } from "~/server/db/schema";
import { z } from "zod";
import logEvent, { LogType } from "~/server/log";
import { TRPCError } from "@trpc/server";
import { eq, sql } from "drizzle-orm";

const COMMENT_LENGTH = 500;

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
      logEvent(
        `User ${userId} does not exist`,
        JSON.stringify(userIdResult),
        LogType.ERROR,
      );
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
      logEvent(
        `Offer ${offerId} does not exist`,
        JSON.stringify(offerResult),
        LogType.ERROR,
      );
      return new TRPCError({
        code: "NOT_FOUND",
        message: "Offer with provided Id does not exist",
      });
    }

    const ok = await db.transaction(async (tx) => {
      const [returned] = await tx.insert(reviews).values(input).returning();
      if (!returned) {
        tx.rollback();
        return false;
      }

      const newRatingsSum = offerResult.ratingsSum
        ? offerResult.ratingsSum + rating
        : rating;

      const [returnedOffer] = await tx
        .update(offers)
        .set({ ratingsSum: newRatingsSum })
        .where(eq(offers.id, offerResult.id))
        .returning();

      if (!returnedOffer) {
        tx.rollback();
        return false;
      }

      return true;
    });

    if (replyTo) {
      if (data) {
        logEvent(
          `User ${userId} replied to review ${replyTo} with review ${data?.id}`,
          JSON.stringify(data),
        );
        return data;
      } else {
        logEvent(
          "Failed to create review (reply)",
          JSON.stringify(error),
          LogType.ERROR,
        );
        return new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error,
        });
      }
    } else {
      const values = { offerId, userId, comment };
      const result = await db.insert(reviews).values(values);
      if (!result) {
        logEvent(
          "Failed to create review",
          JSON.stringify(result),
          LogType.ERROR,
        );
        return new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create review",
        });
      }

      logEvent(
        `User ${userId} added review to offer ${offerId}`,
        JSON.stringify(result),
      );
      return result;
    }
  });

export default createProcedure;
