import { tags } from "~/server/db/schema";
import { procedure } from "~/server/api/trpc";

const getAllTagsProcedure = procedure.query(async ({ ctx }) => {
  const allTags = await ctx.db.select().from(tags);
  if (!allTags || allTags.length === 0) {
    console.log("No tags found, adding some");
    const newTags = await ctx.db
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
