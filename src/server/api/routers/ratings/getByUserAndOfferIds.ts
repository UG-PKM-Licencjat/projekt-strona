import { procedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { ratings } from "~/server/db/schema";
import { z } from "zod";
import logEvent, { LogType } from "~/server/log";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { log } from "console";

export const getByUserAndOfferIds = procedure
  .input(
    z.object({
      offerId: z.string(),
      userId: z.string(),
    }),
  )
  .query(async ({ input }) => {
    logEvent("Fetching ratings by user and offer ids", JSON.stringify(input));
    const { offerId, userId } = input;

    const result = await db
      .select({
        rating: ratings.rating,
      })
      .from(ratings)
      .where(and(eq(ratings.userId, userId), eq(ratings.offerId, offerId)))
      .limit(1);

    if (!result[0]) {
      logEvent(
        "Failed to fetch rating by user and offer ids",
        JSON.stringify(result),
        LogType.ERROR,
      );
      return new TRPCError({
        code: "NOT_FOUND",
        message: "Failed to fetch rating by user and offer ids",
      });
    }

    logEvent("Fetched rating by user and offer ids", JSON.stringify(result));
    return result[0];
  });

export default getByUserAndOfferIds;
