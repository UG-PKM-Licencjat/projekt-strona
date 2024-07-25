import { adminProcedure } from "~/server/trpc";
import { users } from "~/server/db/schema";
import { db } from "~/server/db";
import { z } from "zod";
import logEvent from "~/server/log";

const createProcedure = adminProcedure
  .input(
    z.object({
      email: z.string(),
    }),
  )
  .mutation(async (opts) => {
    logEvent("Creating user", opts.input.email);
    await db.insert(users).values({ email: opts.input.email });
    return;
  });

export default createProcedure;
