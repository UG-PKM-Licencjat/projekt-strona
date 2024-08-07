import { z } from "zod";
import { db } from "../db";
import { sessions, users, offers, offerTags } from "../db/schema";
import { procedure, router, authedProcedure, adminProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import logEvent, { LogType, tagValues } from "../log";
import { utapi } from "../uploadthing";

const keys = Object.keys(LogType);

export const appRouter = router({
  getUsers: authedProcedure.query(async ({ ctx }) => {
    // TODO: implement with pagination etc
    console.log(ctx.session);
    try {
      logEvent("Fetching users");
      const fetchedUsers = await db.select().from(users);
      return fetchedUsers;
    } catch (error) {
      console.log("Error fetching users", error);
      return [];
    }
  }),
  clientLog: procedure
    .input(
      z.object({
        message: z.string(),
        additionalInfo: z.string().default(""),
        logType: z.nativeEnum(LogType).default(LogType.INFO),
        tags: z.array(z.enum(tagValues)).default([]),
      }),
    )
    .mutation((opts) => {
      logEvent(
        opts.input.message,
        opts.input.additionalInfo,
        opts.input.logType,
        opts.input.tags,
      );
    }),
  deleteUser: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async (opts) => {
      console.log("Deleting user", opts.input.id);
      await db.delete(sessions).where(eq(sessions.userId, opts.input.id));
      await db.delete(users).where(eq(users.id, opts.input.id));
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
      const tags = fetchedOffer?.offerTags.map((tag) => tag.tag);
      const mappedOffer = { ...fetchedOffer, offerTags: tags };
      console.log("Fetched offer", mappedOffer);
      return mappedOffer;
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

  changeStep: authedProcedure
    .input(
      z.object({
        step: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        console.log("Changing registration step", input.step);
        console.log("User id", ctx.session?.user.id);
        const fetchedUsers = await db
          .update(users)
          .set({
            registrationStatus: input.step,
          })
          .where(eq(users.id, ctx.session?.user.id));
        console.log("Changed registration step", fetchedUsers);
        return fetchedUsers;
      } catch (error) {
        console.log("Error fetching registration data", error);
        return [];
      }
    }),

  getRegistationStep: authedProcedure.query(async ({ ctx }) => {
    try {
      const step = await db
        .select({
          registrationStatus: users.registrationStatus,
        })
        .from(users)
        .where(eq(users.id, ctx.session?.user.id));
      console.log("Fetched registration step", step);
      return step;
    } catch (error) {
      console.log("Error fetching registration data", error);
      return;
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
      // console.log("Fetched registration data", fetchedUserData);
      return fetchedUserData;
    } catch (error) {
      console.log("Error fetching registration data", error);
      return [];
    }
  }),
});

export type AppRouter = typeof appRouter;
