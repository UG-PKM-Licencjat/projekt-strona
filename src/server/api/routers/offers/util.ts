import { type SQL, or, like, eq, and } from "drizzle-orm";
import { offers } from "~/server/db/schema";

export function buildSearchQuery(
  text: string,
  location: string,
): SQL | undefined {
  let query: SQL | undefined;

  if (text !== "")
    query = or(like(offers.name, `%${text}%`), like(offers.about, `%${text}%`));

  if (location !== "" && text === "") query = eq(offers.location, location);
  else if (location !== "") query = and(eq(offers.location, location), query);

  return query;
}
