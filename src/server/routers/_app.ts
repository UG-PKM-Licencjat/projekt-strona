import { z } from "zod";
import { procedure, router } from "../trpc";
import logEvent, { LogType, tagValues } from "../log";
import { type Message } from "~/components/chat/ConversationWindow/ConversationWindow";

import { AdminRouter } from "./admin";
import { OffersRouter } from "./offers";

export const appRouter = router({
  admin: AdminRouter,
  offers: OffersRouter,
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
});

export type AppRouter = typeof appRouter;
