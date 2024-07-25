import { adminProcedure, procedure } from "~/server/trpc";
import { offers, users, userOffers } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";
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
    logEvent("Fetching sessions by userId", input.userId);
    const fetchedOffers = await db
      .select()
      .from(offers)
      .where(
        and(
          eq(userOffers.userId, input.userId),
          eq(userOffers.offerId, offers.id),
        ),
      );
    return fetchedOffers;
  });

export default getByUserIdProcedure;
