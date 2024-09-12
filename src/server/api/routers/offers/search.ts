import { z } from "zod";
import { procedure } from "../../trpc";
import { db } from "~/server/db";
import { offers } from "~/server/db/schema";
import { and, eq, like, not, or } from "drizzle-orm";

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
    console.log("Starting query");
    // TODO improve searching algorithm if time allows
    // let query;

    // if (opts.input.text !== "")
    //   query = or(
    //     like(offers.name, `%${opts.input.text}%`),
    //     like(offers.about, `%${opts.input.text}%`),
    //   );

    // if (opts.input.location !== "")
    //   query = and(eq(offers.location, opts.input.location), query);

    console.log("Executing query");
    const dbOffers = await db.select().from(offers);
    // .where(query)
    // .limit(opts.input.limit)
    // .offset(opts.input.skip);

    // console.log(dbOffers);
    console.log("Gotten response");
    return dbOffers;
  });

export default searchProcedure;
