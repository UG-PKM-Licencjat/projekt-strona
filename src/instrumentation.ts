// ! DEVELOPMENT ONLY
import { env } from "~/env";
import { db } from "~/server/db";
import { tags } from "~/server/db/schema";

export async function register() {
  if (env.NODE_ENV === "development") {
    const test = await db.select().from(tags);
    if (test.length === 0) {
      console.log("No tags found, creating mock ones...");
      // * Insert mock hashtags for offer creation to work
      const result = await db.insert(tags).values([
        { name: "hashtag1", id: "0" },
        { name: "hashtag2", id: "1" },
        { name: "hashtag3", id: "2" },
      ]);
      console.log(result);
    }
  }
}
