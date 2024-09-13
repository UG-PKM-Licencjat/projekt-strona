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
      replyTo: z.string().optional(),
    }),
  )
  .mutation(async (opts) => {
    const { input } = opts;
    const { offerId, userId, comment } = input;

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

    const result = await db
      .insert(reviews)
      .values({ offerId, userId, comment });

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
  });

export default createProcedure;
