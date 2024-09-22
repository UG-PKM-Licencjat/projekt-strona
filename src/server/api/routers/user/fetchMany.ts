import { z } from "zod";
import { authedProcedure } from "../../trpc";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { inArray } from "drizzle-orm";

const fetchManyProcedure = authedProcedure
  .input(z.array(z.string())) // Array of ids
  .query(async (opts) => {
    return await db
      .select({ id: users.id, name: users.name, image: users.image })
      .from(users)
      .where(inArray(users.id, opts.input));
  });

export default fetchManyProcedure;
