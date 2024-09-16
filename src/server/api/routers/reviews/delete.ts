import { procedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { offers, reviews } from "~/server/db/schema";
import { z } from "zod";
import logEvent, { LogType } from "~/server/log";
import { TRPCError } from "@trpc/server";
import { eq, sql } from "drizzle-orm";

// TODO: add authorization per user
export const deleteProcedure = procedure
  .input(
    z.object({
      id: z.number().int(),
    }),
  )
  .mutation(async (opts) => {
    const { input } = opts;
    const { id } = input;

    const ok = await db.transaction(async (tx) => {
      const [returned] = await tx
        .delete(reviews)
        .where(eq(reviews.id, id))
        .returning();

      if (!returned) {
        tx.rollback();
        return false;
      }

      const [updated] = await tx
        .update(offers)
        .set({
          votes: sql`${offers.votes} - 1`,
          ratingsSum: sql`${offers.ratingsSum} - ${returned.rating}`,
        })
        .returning();

      if (!updated) {
        tx.rollback();
        return false;
      }

      return true;
    });

    if (!ok) {
      logEvent({ message: "Failed to delete review", logType: LogType.ERROR });
      return new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete review",
      });
    }

    logEvent({ message: "Failed to delete review", logType: LogType.ERROR });
    return id;
  });

export default deleteProcedure;
