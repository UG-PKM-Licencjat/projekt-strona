import { z } from "zod";
import { procedure } from "../../trpc";
import { db } from "~/server/db";
import { offers } from "~/server/db/schema";
import { and, eq, like, or } from "drizzle-orm";

const searchProcedure = procedure
  .input(
    z.object({
      text: z.string(),
      location: z.string(),
      skip: z.number(),
      limit: z.number(),
    }),
  )
  .query(async (opts) => {
    // TODO improve searching algorithm if time allows
    const dbOffers = db
      .select()
      .from(offers)
      .where(
        and(
          eq(offers.location, opts.input.location),
          or(
            like(offers.name, `%${opts.input.text}%`),
            like(offers.about, `%${opts.input.text}%`),
          ),
        ),
      )
      .limit(opts.input.limit)
      .offset(opts.input.skip);
    return [];
  });

export default searchProcedure;
