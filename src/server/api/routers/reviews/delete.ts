import { procedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { reviews } from "~/server/db/schema";
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

    const { data, error } = await db.transaction(async (tx) => {
      const returned = await tx
        .delete(reviews)
        .where(eq(reviews.id, id))
        .returning();

      if (!returned) {
        return { data: null, error: "Failed to delete review" };
      }

      const decrement = await tx
        .update(reviews)
        .set({ replyTo: sql`${reviews.replies} - 1` })
        .where(eq(reviews.replyTo, id))
        .returning();

      if (!decrement) {
        return { data: null, error: "Failed to decrement reply count" };
      }

      return { data: returned, error: null };
    });

    if (data) {
      logEvent(`Review with id:${id} was deleted`, JSON.stringify(data));
      return data;
    } else {
      logEvent("Failed to delete review", JSON.stringify(error), LogType.ERROR);
      return new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error,
      });
    }
  });

export default deleteProcedure;
