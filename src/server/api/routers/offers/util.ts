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

  // TODO possibly change this when drizzle finally fixes geometry type
  const isInRange = sql`ST_DWithin(
  ST_SetSRID(ST_MakePoint(
    (${offers.location}->>'x')::float, 
    (${offers.location}->>'y')::float
  ), 4326)::geography, ST_SetSRID(ST_MakePoint(${location.x}, ${location.y}), 4326)::geography, ${offers.distance} * 1000)`;

  if (location.x !== null && location.y !== null && text === "") {
    query = isInRange;
  } else if (location.x !== null && location.y !== null) {
    query = and(query, isInRange);
  }

  return query;
}
