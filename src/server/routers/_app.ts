import { procedure, router } from "../trpc";

export const appRouter = router({
  getHello: procedure.query(() => {
    return {
      greeting: `Hello!`,
    };
  }),
});

export type AppRouter = typeof appRouter;
