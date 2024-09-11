import { env } from "src/env.js";
import { MongoClient } from "mongodb";

const client = new MongoClient(env.MONGO_URL);

await client.connect().catch((err) => console.log(err));

const mongo = client.db();

// Export db
export default mongo;
