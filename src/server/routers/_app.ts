import { procedure, router } from "../trpc";

export const appRouter = router({
  getHello: procedure.query(() => {
    return {
      greeting: `Hello!`,
    };
  }),

  getUsers: procedure.query(() => {
    // TODO: implement
    return ["piotr", "lukasz", "marcin"];
  }),
});

export type AppRouter = typeof appRouter;
