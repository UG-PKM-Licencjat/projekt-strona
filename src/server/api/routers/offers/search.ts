import { z } from "zod";
import { procedure } from "../../trpc";
import { offers, offerTags, tags, users } from "~/server/db/schema";
import { buildSearchQuery } from "./util";
import { asc, count, desc, eq, getTableColumns, sql } from "drizzle-orm";

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
      sortBy: z.string().optional(),
      sortDirection: z.enum(["asc", "desc"]).optional(),
    }),
  )
  .query(async ({ ctx, input }) => {
    // TODO improve searching algorithm if time allows
    const query = buildSearchQuery(input.text, input.location);

    const offerCount = await ctx.db
      .select({ count: count() })
      .from(offers)
      .leftJoin(users, eq(offers.userId, users.id))
      .leftJoin(offerTags, eq(offers.id, offerTags.offerId))
      .leftJoin(tags, eq(offerTags.tagId, tags.id))
      .where(query)
      .groupBy(offers.id)
      .limit(1);

    const orderByColumn = input.sortBy
      ? sql.identifier(input.sortBy)
      : offers.id;

    const orderDirection =
      input.sortDirection === "asc" ? asc(orderByColumn) : desc(orderByColumn);

    const dbOffers2 = await ctx.db
      .select({
        fullName: users.name,
        image: users.image,
        ...getTableColumns(offers),
      })
      .from(offers)
      .leftJoin(users, eq(offers.userId, users.id))
      .leftJoin(offerTags, eq(offers.id, offerTags.offerId))
      .leftJoin(tags, eq(offerTags.tagId, tags.id))
      .where(query)
      .groupBy(offers.id, users.name, users.image)
      .orderBy(orderDirection)
      .limit(input.limit)
      .offset(input.skip);

    return { offerCount: offerCount[0]?.count, offers: dbOffers2 };
  });

export default searchProcedure;
