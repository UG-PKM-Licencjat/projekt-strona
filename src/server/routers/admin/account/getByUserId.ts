import { adminProcedure, procedure } from "~/server/trpc";
import { accounts } from "~/server/db/schema";
import { eq, count, getTableColumns } from "drizzle-orm";
import { db } from "~/server/db";
import { z } from "zod";
import logEvent from "~/server/log";
import { log } from "console";

const getByUserIdProcedure = procedure
  .input(
    z.object({
      userId: z.string(),
    }),
  )
  .query(async ({ input }) => {
    logEvent("Fetching accounts by userId", input.userId);
    const fetchedAccounts = await db.query.accounts.findMany({
      where: eq(accounts.userId, input.userId),
    });
    return fetchedAccounts;
  });

export default getByUserIdProcedure;
