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
      id: z.number().int(),
      newRating: z.number().min(1).max(5),
    }),
  )
  .mutation(async (opts) => {
    const { input } = opts;
    const { id, newRating } = input;

    logEvent({
      message: "Updating rating",
      additionalInfo: JSON.stringify(input),
    });

    const ratingExists = await db
      .select()
      .from(ratings)
      .where(eq(ratings.id, id))
      .limit(1);

    if (ratingExists.length === 0) {
      logEvent({
        message: `Review with provided id does not exist`,
        additionalInfo: JSON.stringify(ratingExists),
        logType: LogType.ERROR,
      });
      return new TRPCError({
        code: "NOT_FOUND",
        message: "User never rated this offer",
      });
    }

    const result = await db
      .update(ratings)
      .set({ rating: newRating })
      .where(eq(ratings.id, id));

    if (!result) {
      logEvent({
        message: "Failed to update rating",
        additionalInfo: JSON.stringify(result),
        logType: LogType.ERROR,
      });
      return new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update rating",
      });
    }

    logEvent({
      message: `User updated rating with id:${id}`,
      additionalInfo: JSON.stringify(result),
    });
    return result;
  });

export default updateProcedure;
