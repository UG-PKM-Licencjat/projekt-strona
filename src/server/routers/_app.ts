import { z } from "zod";
import { db } from "../db";
import { offers } from "../db/schema";
import { procedure, router } from "../trpc";
import { eq } from "drizzle-orm";
import logEvent, { LogType, tagValues } from "../log";
import { type Message } from "~/components/chat/ConversationWindow/ConversationWindow";

import { AdminRouter } from "./admin";

export const appRouter = router({
  admin: AdminRouter,
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
