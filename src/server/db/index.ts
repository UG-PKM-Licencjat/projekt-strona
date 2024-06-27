// Vercel postgres version

import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import * as schema from "./schema";

export const db = drizzle(sql, { schema });

// Universal Database URL version

// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";
// import { env } from "~/env.js";

// export const postgresClient = postgres(env.POSTGRES_URL);
// export const db = drizzleJS(postgresClient, { schema });
