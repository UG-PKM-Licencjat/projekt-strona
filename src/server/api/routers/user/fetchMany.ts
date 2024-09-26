import { z } from "zod";
import { authedProcedure } from "../../trpc";
import { offers, users } from "~/server/db/schema";
import { eq, inArray } from "drizzle-orm";

const fetchManyProcedure = authedProcedure
  .input(z.array(z.string())) // Array of ids
  .query(async ({ ctx, input }) => {
    return await ctx.db
      .select({
        id: users.id,
        name: users.name,
        image: users.image,
        offerId: offers.id,
      })
      .from(users)
      .leftJoin(offers, eq(offers.userId, users.id))
      .where(inArray(users.id, input));
  });

export default fetchManyProcedure;
