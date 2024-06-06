import { z } from "zod";
import { db } from "../db";
import { users, offers, offerTags } from "../db/schema";
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
  getOffer: procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      console.log("Fetching offer", input.id);
      const fetchedOffer = await db.query.offers.findFirst({
        with: {
          offerTags: {
            columns: {
              tagId: false,
              offerId: false,
            },
            with: {
              tag: true,
            },
          },
        },
        where: eq(offers.id, input.id),
      });
      console.log("Fetched offer", fetchedOffer);
      return fetchedOffer;
    }),

  // TODO finish create offer procedure
  // createOffer: procedure
  //   .input(
  //     z.object({
  //       id: z.string(),
  //       name: z.string(),
  //       description: z.string(),
  //       price: z.number(),
  //       tags: z.array(z.string()),
  //     }),
  //   )
  //   .mutation(async ({ input }) => {
  //     console.log("Creating offer", input);
  //     const offer = await db
  //       .insert(offers)
  //       .values([
  //         {
  //           id: input.id,
  //           name: input.name,
  //           description: input.description,
  //           price: input.price,
  //         },
  //       ])
  //       .returning();
  //     return offer;
  //   }),
});

export type AppRouter = typeof appRouter;
