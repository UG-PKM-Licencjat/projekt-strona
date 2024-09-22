import { z } from "zod";
import { procedure } from "../../trpc";
import { db } from "~/server/db";
import { offers } from "~/server/db/schema";
import { buildSearchQuery } from "./util";

const searchProcedure = procedure
  .input(
    z.object({
      text: z.string(),
      location: z.object({ x: z.number(), y: z.number() }),
      skip: z.number(),
      limit: z.number(),
    }),
  )
  .query(async (opts) => {
    // TODO improve searching algorithm if time allows
    const query = buildSearchQuery(opts.input.text, opts.input.location);

    const dbOffers = await db
      .select()
      .from(offers)
      .where(query)
      .limit(opts.input.limit)
      .offset(opts.input.skip);

    return dbOffers;
  });

export default searchProcedure;
