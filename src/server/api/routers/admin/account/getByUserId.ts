import { procedure } from "~/server/api/trpc";
import { accounts } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import logEvent from "~/server/log";

const getByUserIdProcedure = procedure
  .input(
    z.object({
      userId: z.string(),
    }),
  )
  .query(async ({ ctx, input }) => {
    logEvent({
      message: "Fetching accounts by userId",
      additionalInfo: input.userId,
    });
    const fetchedAccounts = await ctx.db.query.accounts.findMany({
      where: eq(accounts.userId, input.userId),
    });
    return fetchedAccounts;
  });

export default getByUserIdProcedure;
