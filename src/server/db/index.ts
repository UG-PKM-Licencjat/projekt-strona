import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env.js";
import * as schema from "./schema";

export const postgresClient = postgres(env.DATABASE_URL);
export const db = drizzle(postgresClient, { schema });
