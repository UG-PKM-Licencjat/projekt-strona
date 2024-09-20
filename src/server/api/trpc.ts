import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import type { Session } from "next-auth";
import { users } from "~/server/db/schema";
import logEvent, { LogType } from "../log";
import { eq } from "drizzle-orm";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await getServerAuthSession();

  return {
    db,
    session,
    ...opts,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const procedure = t.procedure;

export const authMiddleware = t.middleware(async ({ next }) => {
  const session: Session | null = await getServerAuthSession();
  console.log("trpc authorization", session);
  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const [userIdResult] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  if (!userIdResult) {
    logEvent({
      message: `User ${session.user.id} does not exist`,
      additionalInfo: JSON.stringify(userIdResult),
      logType: LogType.ERROR,
    });
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User with provided Id does not exist",
    });
  }

  // return session in context
  return next({ ctx: { session } });
});

export const authedProcedure = t.procedure.use(authMiddleware);

export const adminProcedure = authedProcedure.use(async ({ ctx, next }) => {
  if (ctx.session?.user.admin !== true) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next();
});
