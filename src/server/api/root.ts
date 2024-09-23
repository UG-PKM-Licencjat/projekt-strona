import { z } from "zod";
import {
  createCallerFactory,
  createTRPCRouter,
  procedure,
} from "~/server/api/trpc";
import logEvent, { LogType, tagValues } from "../log";

import { AdminRouter } from "./routers/admin";
import { OffersRouter } from "./routers/offers";
import { UserRouter } from "./routers/user";
import { ReviewsRouter } from "./routers/reviews";
import { AccountsRouter } from "./routers/accounts";

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
  accounts: AccountsRouter,
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
  testProcedure: procedure.query(() => {
    logEvent({
      message: "Test procedure",
      additionalInfo: "Test procedure",
      logType: LogType.INFO,
      tags: ["FRONTEND"],
    });
    return "Hello";
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
