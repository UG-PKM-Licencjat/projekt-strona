import { adminProcedure, procedure } from "~/server/api/trpc";
import { offers, users, userOffers } from "~/server/db/schema";
import { eq, getTableColumns } from "drizzle-orm";
import { db } from "~/server/db";
import { z } from "zod";
import logEvent from "~/server/log";

const getByUserIdProcedure = procedure
  .input(
    z.object({
      userId: z.string(),
    }),
  )
  .query(async ({ input }) => {
    logEvent("Fetching offers by userId", input.userId);
    const columns = getTableColumns(offers);

    const fetchedOffers = await db
      .select({
        ...columns,
      })
      .from(offers)
      .leftJoin(userOffers, eq(offers.id, userOffers.offerId))
      .where(eq(userOffers.userId, input.userId));
    return fetchedOffers;
  });

export default getByUserIdProcedure;