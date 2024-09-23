import { adminProcedure } from "~/server/api/trpc";
import { sessions, users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import logEvent from "~/server/log";

const deleteProcedure = adminProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    logEvent({ message: "Deleting user", additionalInfo: input.id });
    await ctx.db.delete(sessions).where(eq(sessions.userId, input.id));
    await ctx.db.delete(users).where(eq(users.id, input.id));
    return;
  });

export default deleteProcedure;
