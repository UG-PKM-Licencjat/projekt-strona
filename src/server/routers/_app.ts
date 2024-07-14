import { z } from "zod";
import { db } from "../db";
import { users } from "../db/schema";
import { procedure, router, authedProcedure } from "../trpc";
import { eq } from "drizzle-orm";

export const appRouter = router({
  getUsers: authedProcedure.query(async ({ ctx }) => {
    // TODO: implement with pagination etc
    console.log(ctx.session);
    try {
      // console.log("Fetching users");
      const fetchedUsers = await db.select().from(users);
      // console.log("Fetched users", fetchedUsers);
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
  addUsers: authedProcedure.mutation(async () => {
    console.log("Adding users");

    try {
      await db.insert(users).values([
        {
          id: "199",
          name: "Piotr",
          email: "piotr@example.com",
          image:
            "https://i.natgeofe.com/n/4cebbf38-5df4-4ed0-864a-4ebeb64d33a4/NationalGeographic_1468962_3x4.jpg",
        },
        {
          id: "299",
          name: "Lukasz",
          email: "lukasz@example.com",
          image:
            "https://i.natgeofe.com/n/4cebbf38-5df4-4ed0-864a-4ebeb64d33a4/NationalGeographic_1468962_3x4.jpg",
        },
      ]);
    } catch (error) {
      console.log("Error adding users", error);
    }
    return;
  }),

  putRegistrationData1Step: authedProcedure
    .input(
      z.object({
        nickname: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        location: z.string(),
        image: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const fetchedUsers = await db
          .update(users)
          .set({
            nickname: input.nickname,
            firstName: input.firstName,
            lastName: input.lastName,
            location: input.location,
            image: input.image,
          })
          .where(eq(users.id, ctx.session?.user.id));

        return fetchedUsers;
      } catch (error) {
        console.log("Error fetching registration data", error);
        return [];
      }
    }),

  getRegistrationData1Step: authedProcedure.query(async ({ ctx }) => {
    try {
      const fetchedUserData = await db
        .select({
          nickname: users.nickname,
          firstName: users.firstName,
          lastName: users.lastName,
          location: users.location,
          image: users.image,
        })
        .from(users)
        .where(eq(users.id, ctx.session?.user.id));
      console.log("Fetched registration data", fetchedUserData);
      return fetchedUserData;
    } catch (error) {
      console.log("Error fetching registration data", error);
      return [];
    }
  }),
});

export type AppRouter = typeof appRouter;
