import { procedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { reviews, users, offers } from "~/server/db/schema";
import { z } from "zod";
import logEvent, { LogType } from "~/server/log";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

const COMMENT_LENGTH = 500;

export const createProcedure = procedure
  .input(
    z.object({
      offerId: z.string(),
      userId: z.string(),
      comment: z.string().max(COMMENT_LENGTH),
      replyTo: z.number().int().optional(),
    }),
  )
  .mutation(async (opts) => {
    const { input } = opts;
    const { offerId, userId, comment, replyTo } = input;

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

    let values;
    if (replyTo) {
      values = { offerId, userId, comment, replyTo };
    } else {
      values = { offerId, userId, comment };
    }
    const result = await db.insert(reviews).values(values);

    if (!result) {
      logEvent({
        message: "Failed to create review",
        additionalInfo: JSON.stringify(result),
        logType: LogType.ERROR,
      });
      return new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create review",
      });
    }

    logEvent({
      message: `User ${userId} added review to offer ${offerId}`,
      additionalInfo: JSON.stringify(result),
    });
    return result;
  });

export default createProcedure;
