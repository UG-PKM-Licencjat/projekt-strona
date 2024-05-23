import { defineConfig } from "drizzle-kit";

import { env } from "~/env.js";

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["projekt-strona_*"],
});
