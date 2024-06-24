import { drizzle as drizzleJS } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { sql } from "@vercel/postgres";
import { drizzle as drizzleVercel } from "drizzle-orm/vercel-postgres";

import { env } from "~/env.js";
import * as schema from "./schema";

type DB = ReturnType<typeof drizzleJS> | ReturnType<typeof drizzleVercel>;

export let db: DB;
export let postgresClient: ReturnType<typeof postgres>;

if (process.env.NODE_ENV === "production") {
  db = drizzleVercel(sql, { schema });
} else {
  postgresClient = postgres(env.DATABASE_URL);
  db = drizzleJS(postgresClient, { schema });
}
