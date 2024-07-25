import { adminProcedure } from "~/server/trpc";
import { sessions, users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { z } from "zod";
import logEvent from "~/server/log";

const deleteUserProcedure = adminProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async (opts) => {
    logEvent("Deleting user", opts.input.id);
    await db.delete(sessions).where(eq(sessions.userId, opts.input.id));
    await db.delete(users).where(eq(users.id, opts.input.id));
    return;
  });

export default deleteUserProcedure;
