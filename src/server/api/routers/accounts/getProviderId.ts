import { z } from "zod";
import { authedProcedure } from "../../trpc";
import { accounts } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import logEvent from "~/server/log";
import { TRPCError } from "@trpc/server";

const getProviderId = authedProcedure
  .input(z.string()) // user Id
  .query(async ({ ctx, input }) => {
    const [result] = await ctx.db
      .select({ providerAccountId: accounts.providerAccountId })
      .from(accounts)
      .where(eq(accounts.userId, input))
      .limit(1);

    if (!result) {
      logEvent({
        message: `User ${input} does not exist`,
      });
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User with provided Id does not exist",
      });
    }

    return result.providerAccountId;
  });

export default getProviderId;
