import { z } from "zod";
import { db } from "../db";
import { sessions, users, offers, offerTags } from "../db/schema";
import { procedure, router, authedProcedure, adminProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import logEvent, { LogType, tagValues } from "../log";
import { utapi } from "../uploadthing";
import { UserWithMessage } from "~/components/chat/ConversationsNav/ConversationsNav";
import { Message } from "~/components/chat/ConversationWindow/ConversationWindow";

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
  getSampleMessages: procedure.input(z.string()).query(async ({ input }) => {
    const data: Array<Message> = (await (
      await fetch(
        `https://chat-swxn.onrender.com/messages/sample?user=${input}`,
      )
    ).json()) as Array<Message>; // TODO: validate with zod and fix it to be safe
    console.log("================================"); //.result!.data! as Array<UserWithMessage>;
    console.log(data);
    console.log("=========================");
    // logEvent(
    //   `Fetched sample messages for user ${input} with first element name: ${data[0]?.name}`,
    // );
    return data;
  }),
  // TODO finish create offer procedure
  // createOffer: procedureatl
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
