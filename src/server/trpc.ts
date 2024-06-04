import { initTRPC } from "@trpc/server";
import { getServerAuthSession } from "./auth";
import type { Session } from "next-auth";

const t = initTRPC.create();

export const authMiddleware = t.middleware(async ({ ctx, next }) => {
  const session: Session | null = await getServerAuthSession();
  console.log("trpc authorization", session);
  if (!session) {
    // not authenticated
  }
  // return session in context
  return next({ ctx: { session } });
});

export const authedProcedure = t.procedure.use(authMiddleware);

export const adminProcedure = authedProcedure.use(async ({ ctx, next }) => {
  if (ctx.session?.user.admin !== true) {
    throw new Error("Unauthorized");
  }
  return next();
});

export const router = t.router;
export const procedure = t.procedure;
