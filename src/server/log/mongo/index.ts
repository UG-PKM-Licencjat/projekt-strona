import { env } from "src/env.js";
import { type Db, MongoClient } from "mongodb";

let mongo: Db | null = null;

export async function getDB(): Promise<Db | null> {
  if (env.LOG === "true") {
    if (!mongo) {
      const client = await MongoClient.connect(env.MONGO_URL);
      mongo = client.db();
    }
    return mongo;
  } else {
    return null;
  }
}
