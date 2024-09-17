import { procedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { reviews } from "~/server/db/schema";
import { z } from "zod";
import logEvent, { LogType } from "~/server/log";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export const deleteProcedure = procedure
  .input(
    z.object({
      id: z.number().int(),
    }),
  )
  .mutation(async (opts) => {
    const { input } = opts;
    const { id } = input;

    const result = await db
      .delete(reviews)
      .where(eq(reviews.id, id))
      .returning();

    if (!result) {
      logEvent({
        message: "Failed to delete review",
        additionalInfo: JSON.stringify(result),
        logType: LogType.ERROR,
      });
      return new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create review",
      });
    }

    logEvent({
      message: `Review with id:${id} was deleted`,
      additionalInfo: JSON.stringify(result),
    });
    return result;
  });

export default deleteProcedure;
