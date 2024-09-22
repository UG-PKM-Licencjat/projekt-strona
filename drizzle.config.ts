import { defineConfig } from "drizzle-kit";

import { env } from "src/env.js";

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  extensionsFilters: ["postgis"],
});
