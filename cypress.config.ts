import { defineConfig } from "cypress";
import { accounts, sessions, users } from "./src/server/db/schema";

import {} from "drizzle-orm/vercel-postgres";
import { drizzle as drizzleJS } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./src/server/db/schema";
import { eq } from "drizzle-orm";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn =
  globalForDb.conn ??
  postgres("postgresql://postgres:password@localhost:5432/.");

const db = drizzleJS(conn, { schema });

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        async "db:seed-session"(accountCreated = false) {
          // drop session, account and user records
          await db
            .delete(sessions)
            .where(eq(sessions.sessionToken, "test-session-token"));
          await db
            .delete(accounts)
            .where(eq(accounts.providerAccountId, "test-provider-account-id"));
          const [user] = await db
            .delete(users)
            .where(eq(users.email, "testuser@example.com"))
            .returning();
          // if (!user) {
          //   await db.delete(u);
          // }
          const userId = await db.transaction(async (tx) => {
            // Dodanie testowego użytkownika
            const [returning] = await tx
              .insert(users)
              .values({
                name: "Test User",
                firstName: "Test",
                lastName: "User",
                email: "testuser@example.com",
                emailVerified: new Date(),
                image:
                  "https://lh3.googleusercontent.com/a/ACg8ocJm0SuZ4R0nRx-FO9C50yCixDvY59FH5tZLPncKash1JZa5Ce8=s96-c",
                isPremium: false,
                isAdmin: false,
                isActive: true,
                registered: accountCreated,
              })
              .returning();

            if (!returning) {
              throw new Error("Could not create test data");
            }

            const userId = returning.id;

            // Dodanie testowego konta
            await tx.insert(accounts).values({
              userId: userId,
              type: "oauth",
              provider: "test-provider",
              providerAccountId: "test-provider-account-id",
              refresh_token: "test-refresh-token",
              access_token: "test-access-token",
              expires_at: null,
              token_type: "Bearer",
              scope: "read write",
              id_token: "test-id-token",
              session_state: "active",
              admin: false,
            });

            // Dodanie testowej sesji
            await tx.insert(sessions).values({
              sessionToken: "test-session-token",
              userId: userId,
              expires: new Date(Date.now() + 60 * 60 * 1000), // 1 godzina
            });
            return userId;
          });
          return userId;
        },
      });
    },
    baseUrl: "http://localhost:3000",
    retries: 3,
  },
});
