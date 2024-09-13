import { procedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { ratings, users, offers } from "~/server/db/schema";
import { z } from "zod";
import logEvent, { LogType } from "~/server/log";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

export const updateProcedure = procedure
  .input(
    z.object({
      offerId: z.string(),
      userId: z.string(),
      newRating: z.number().min(1).max(5),
    }),
  )
  .mutation(async (opts) => {
    const { input } = opts;
    const { offerId, userId, newRating } = input;

    const userIdResult = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (userIdResult.length === 0) {
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

    const offerIdResult = await db
      .select()
      .from(offers)
      .where(eq(offers.id, offerId))
      .limit(1);

    if (offerIdResult.length === 0) {
      logEvent(
        `Offer ${offerId} does not exist`,
        JSON.stringify(offerIdResult),
        LogType.ERROR,
      );
      return new TRPCError({
        code: "NOT_FOUND",
        message: "Offer with provided Id does not exist",
      });
    }
    const ratingExists = await db
      .select()
      .from(ratings)
      .where(and(eq(ratings.offerId, offerId), eq(ratings.userId, userId)))
      .limit(1);

    if (ratingExists.length === 0) {
      logEvent(
        `User ${userId} has already rated offer ${offerId}`,
        JSON.stringify(ratingExists),
        LogType.ERROR,
      );
      return new TRPCError({
        code: "NOT_FOUND",
        message: "User never rated this offer",
      });
    }

    const result = await db
      .update(ratings)
      .set({ rating: newRating })
      .where(and(eq(ratings.offerId, offerId), eq(ratings.userId, userId)));

    if (!result) {
      logEvent(
        "Failed to update rating",
        JSON.stringify(result),
        LogType.ERROR,
      );
      return new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update rating",
      });
    }

    logEvent(`User ${userId} rated offer ${offerId}`, JSON.stringify(result));
    return result;
  });

export default updateProcedure;
