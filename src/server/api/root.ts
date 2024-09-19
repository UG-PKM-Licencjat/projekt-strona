import { z } from "zod";
import {
  createCallerFactory,
  createTRPCRouter,
  procedure,
} from "~/server/api/trpc";
import logEvent, { LogType, tagValues } from "../log";
import { type Message } from "~/components/chat/ConversationWindow/ConversationWindow";

import { AdminRouter } from "./routers/admin";
import { OffersRouter } from "./routers/offers";
import { UserRouter } from "./routers/user";
import { ReviewsRouter } from "./routers/reviews";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  admin: AdminRouter,
  offers: OffersRouter,
  user: UserRouter,
  reviews: ReviewsRouter,
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
      logEvent({
        message: opts.input.message,
        additionalInfo: opts.input.additionalInfo,
        logType: opts.input.logType,
        tags: opts.input.tags,
      });
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

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
