import { procedure } from "~/server/api/trpc";
import { offers } from "~/server/db/schema";
import { eq, getTableColumns } from "drizzle-orm";
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
      message: "Fetching offers by userId",
      additionalInfo: input.userId,
    });
    const columns = getTableColumns(offers);

    const fetchedOffers = await ctx.db
      .select({
        ...columns,
      })
      .from(offers)
      .where(eq(offers.userId, input.userId));
    return fetchedOffers;
  });

export default getByUserIdProcedure;
