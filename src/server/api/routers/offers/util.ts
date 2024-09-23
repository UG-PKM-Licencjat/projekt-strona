import { type SQL, or, ilike, and, sql } from "drizzle-orm";
import { offers } from "~/server/db/schema";

export function buildSearchQuery(
  text: string,
  location: { x: number | null; y: number | null },
): SQL | undefined {
  let query: SQL | undefined;

  if (text !== "")
    query = or(
      ilike(offers.name, `%${text}%`),
      ilike(offers.shortDescription, `%${text}%`),
    );

  // TODO change this when updating to geometry type
  const stringLocation = JSON.stringify(location);
  const isLocation = sql`${offers.location} @> ${stringLocation} AND ${stringLocation} @> ${offers.location}`;

  if (location.x !== null && location.y !== null && text === "") {
    query = isLocation;
  } else if (location.x !== null && location.y !== null) {
    query = and(query, isLocation);
  }

  return query;
}
