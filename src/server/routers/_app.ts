import { z } from "zod";
import { db } from "../db";
import { sessions, users } from "../db/schema";
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
      await db.delete(sessions).where(eq(sessions.userId, opts.input.id));
      await db.delete(users).where(eq(users.id, opts.input.id));
      return;
    }),
});

export type AppRouter = typeof appRouter;
