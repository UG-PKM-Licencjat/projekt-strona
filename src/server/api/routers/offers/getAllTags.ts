import { db } from "~/server/db";
import { tags } from "~/server/db/schema";
import { procedure } from "~/server/api/trpc";

const getAllTagsProcedure = procedure.query(async () => {
  const allTags = await db.select().from(tags);
  return allTags;
});

export default getAllTagsProcedure;
