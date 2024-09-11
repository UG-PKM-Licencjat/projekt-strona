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

import { env } from "~/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(env.POSTGRES_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export let db:
  | VercelPgDatabase<typeof schema>
  | PostgresJsDatabase<typeof schema>;

if (env.NODE_ENV === "production") {
  db = drizzleVercel(sql, { schema });
} else {
  db = drizzleJS(conn, { schema });
}
