import { z } from "zod";
import { authedProcedure } from "../../trpc";
import { users } from "~/server/db/schema";
import { inArray } from "drizzle-orm";

const fetchManyProcedure = authedProcedure
  .input(z.array(z.string())) // Array of ids
  .query(async ({ ctx, input }) => {
    return await ctx.db
      .select({ id: users.id, name: users.name, image: users.image })
      .from(users)
      .where(inArray(users.id, input));
  });

export default fetchManyProcedure;
