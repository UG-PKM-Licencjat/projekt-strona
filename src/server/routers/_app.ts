import { z } from "zod";
import { db } from "../db";
import { users } from "../db/schema";
import { procedure, router } from "../trpc";
import { eq } from "drizzle-orm";

export const appRouter = router({
  getUsers: procedure.query(async () => {
    // TODO: implement with pagination etc
    try {
      console.log("Fetching users");
      const fetchedUsers = await db.select().from(users);
      console.log("Fetched users", fetchedUsers);
      return fetchedUsers;
    } catch (error) {
      console.log("Error fetching users", error);
      return [];
    }
  }),
  deleteUser: procedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async (opts) => {
      console.log("Deleting user", opts.input.id);
      await db.delete(users).where(eq(users.id, opts.input.id));
      return;
    }),

  // Only for easy mock
  addUsers: procedure.mutation(async () => {
    console.log("Adding users");
    await db.insert(users).values([
      {
        id: "1",
        name: "Piotr",
        email: "piotr@example.com",
        image:
          "https://i.natgeofe.com/n/4cebbf38-5df4-4ed0-864a-4ebeb64d33a4/NationalGeographic_1468962_3x4.jpg",
      },
      {
        id: "2",
        name: "Lukasz",
        email: "lukasz@example.com",
        image:
          "https://i.natgeofe.com/n/4cebbf38-5df4-4ed0-864a-4ebeb64d33a4/NationalGeographic_1468962_3x4.jpg",
      },
    ]);
    return;
  }),
});

export type AppRouter = typeof appRouter;
