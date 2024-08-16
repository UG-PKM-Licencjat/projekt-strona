import { sql } from "@vercel/postgres";
import {
  drizzle as drizzleVercel,
  type VercelPgDatabase,
} from "drizzle-orm/vercel-postgres";
import {
  drizzle as drizzleJS,
  type PostgresJsDatabase,
} from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "~/env.js";
import * as schema from "./schema";

export let db:
  | VercelPgDatabase<typeof schema>
  | PostgresJsDatabase<typeof schema>;

if (env.NODE_ENV === "production") {
  db = drizzleVercel(sql, { schema });
} else {
  const postgresClient = postgres(env.POSTGRES_URL);
  db = drizzleJS(postgresClient, { schema });
}
