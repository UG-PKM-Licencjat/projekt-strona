import { z } from "zod";
import { procedure } from "../../trpc";
import { db } from "~/server/db";
import { offers } from "~/server/db/schema";
import { buildSearchQuery } from "./util";
import { count } from "drizzle-orm";

const searchProcedure = procedure
  .input(
    z.object({
      text: z.string(),
      location: z.object({
        x: z.number().nullable(),
        y: z.number().nullable(),
      }),
      skip: z.number(),
      limit: z.number(),
    }),
  )
  .query(async (opts) => {
    // TODO improve searching algorithm if time allows
    const query = buildSearchQuery(opts.input.text, opts.input.location);

    const offerCount = await db
      .select({ count: count() })
      .from(offers)
      .where(query)
      .limit(1);

    const dbOffers2 = await db.query.offers.findMany({
      where: query,
      columns: {
        id: true,
        userId: true,
        name: true,
        price: true,
        shortDescription: true,
        locationName: true,
        distance: true,
        ratingsSum: true,
        votes: true,
      },
      with: {
        users: {
          columns: {
            image: true,
          },
        },
      },
      limit: opts.input.limit,
      offset: opts.input.skip,
    });
    console.log(dbOffers2);

    return { offerCount: offerCount[0]?.count, offers: dbOffers2 };
  });

export default searchProcedure;
