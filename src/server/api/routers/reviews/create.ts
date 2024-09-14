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

    if (replyTo) {
      const values = { offerId, userId, comment, replyTo };
      const { data, error } = await db.transaction(async (tx) => {
        // add reply as a new review
        const [returned] = await tx.insert(reviews).values(values).returning();

        if (!returned) {
          tx.rollback();
          return { data: null, error: "Failed to create review (reply)" };
        }

        const [increment] = await tx
          .update(reviews)
          .set({ replies: sql`${reviews.replies} + 1` })
          .where(eq(reviews.id, replyTo))
          .returning();

        if (!increment) {
          tx.rollback();
          return {
            data: null,
            error:
              "Failed to increment replies count for review you're replying to",
          };
        }

        return { data: returned, error: null };
      });

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
