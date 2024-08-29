import { db } from "~/server/db";
import { tags } from "~/server/db/schema";
import { procedure } from "~/server/api/trpc";

const getAllTagsProcedure = procedure.query(async () => {
  const allTags = await db.select().from(tags);
  // TODO delete this before deploying
  if (!allTags || allTags.length === 0) {
    console.log("No tags found, adding some");
    const newTags = await db
      .insert(tags)
      .values(
        Array.from({ length: 10 }, (_, i) => ({
          name: `hashtag${i + 1}`,
        })),
      )
      .returning();
    return newTags;
  }
  return allTags;
});

export default getAllTagsProcedure;
