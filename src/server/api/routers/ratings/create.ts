import { procedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { ratings, users, offers } from "~/server/db/schema";
import { z } from "zod";
import logEvent, { LogType } from "~/server/log";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

export const createProcedure = procedure
  .input(
    z.object({
      offerId: z.string(),
      userId: z.string(),
      rating: z.number().min(1).max(5),
    }),
  )
  .mutation(async (opts) => {
    const { input } = opts;
    const { offerId, userId, rating } = input;

    const userIdResult = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (userIdResult.length === 0) {
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

    const offerIdResult = await db
      .select()
      .from(offers)
      .where(eq(offers.id, offerId))
      .limit(1);

    if (offerIdResult.length === 0) {
      logEvent({
        message: `Offer ${offerId} does not exist`,
        additionalInfo: JSON.stringify(offerIdResult),
        logType: LogType.ERROR,
      });
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

    if (ratingExists.length > 0) {
      logEvent({
        message: `User ${userId} has already rated offer ${offerId}`,
        additionalInfo: JSON.stringify(ratingExists),
        logType: LogType.ERROR,
      });
      return new TRPCError({
        code: "CONFLICT",
        message: "User has already rated this offer",
      });
    }

    const result = await db.insert(ratings).values({ offerId, userId, rating });

    if (!result) {
      logEvent({
        message: "Failed to create rating",
        additionalInfo: JSON.stringify(result),
        logType: LogType.ERROR,
      });
      return new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create rating",
      });
    }

    logEvent({
      message: `User ${userId} rated offer ${offerId}`,
      additionalInfo: JSON.stringify(result),
    });
    return result;
  });

export default createProcedure;
