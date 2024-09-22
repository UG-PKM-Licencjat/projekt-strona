import { z } from "zod";
import { authedProcedure } from "../../trpc";
import { db } from "~/server/db";
import { accounts } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import logEvent from "~/server/log";
import { TRPCError } from "@trpc/server";

const getProviderId = authedProcedure
  .input(z.string()) // user Id
  .query(async (opts) => {
    const [result] = await db
      .select({ providerAccountId: accounts.providerAccountId })
      .from(accounts)
      .where(eq(accounts.userId, opts.input))
      .limit(1);

    if (!result) {
      logEvent({
        message: `User ${opts.input} does not exist`,
      });
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User with provided Id does not exist",
      });
    }

    return result.providerAccountId;
  });

export default getProviderId;
