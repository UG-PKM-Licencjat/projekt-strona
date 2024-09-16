import { z } from "zod";
import { procedure } from "../../trpc";
import { buildSearchQuery } from "./util";
import { db } from "~/server/db";
import { offers } from "~/server/db/schema";
import { count } from "drizzle-orm";

const countSearchProcedure = procedure
  .input(
    z.object({
      text: z.string(),
      location: z.string(),
    }),
  )
  .query(async (opts) => {
    const query = buildSearchQuery(opts.input.text, opts.input.location);

    const offerCount = await db
      .select({ count: count() })
      .from(offers)
      .where(query)
      .limit(1);

    return offerCount[0]?.count;
  });

export default countSearchProcedure;
