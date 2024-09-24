import { db } from "~/server/db";
import { accounts, sessions, users } from "~/server/db/schema";

async function createTestData() {
  await db.transaction(async (tx) => {
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
        registered: true,
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
  });
}

// Wywołaj funkcję, aby stworzyć dane testowe
export default createTestData;
