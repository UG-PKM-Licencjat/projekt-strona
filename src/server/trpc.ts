import { initTRPC } from "@trpc/server";
import { getServerAuthSession } from "./auth";
import type { Session } from "next-auth";
import { is } from "drizzle-orm";

const t = initTRPC.create();

export const authMiddleware = t.middleware(async ({ next }) => {
  const session: Session | null = await getServerAuthSession();
  console.log("trpc authorization", session);
  if (!session) {
    throw new Error("Unauthorized");
  }
  return next();
});
export const authedProcedure = t.procedure.use(authMiddleware);

export const router = t.router;
export const procedure = t.procedure;
