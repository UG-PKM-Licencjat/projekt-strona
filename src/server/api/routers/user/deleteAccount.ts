import { authedProcedure } from "../../trpc";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import logEvent from "~/server/log";
import { sessions } from "~/server/db/schema";

const deleteAccount = authedProcedure.mutation(async ({ ctx }) => {
  try {
    const deleteSession = await db
      .delete(sessions)
      .where(eq(sessions.userId, ctx.session?.user.id))
      .returning();
    console.log("deletinggg");
    console.log(deleteSession);
    if (!deleteSession) {
      logEvent({
        message: `User ${ctx.session?.user.id} failed to delete session while deleting account`,
        additionalInfo: JSON.stringify(deleteSession),
        tags: ["DATABASE", "API"],
      });
      return new TRPCError({
        code: "NOT_FOUND",
        message: "Session with provided Id does not exist",
      });
    }
    const deleteAccount = await db
      .delete(users)
      .where(eq(users.id, ctx.session?.user.id))
      .returning();

    console.log(deleteAccount);

    if (!deleteAccount) {
      return new TRPCError({
        code: "NOT_FOUND",
        message: "User with provided Id does not exist",
      });
    }

    logEvent({
      message: `User ${ctx.session?.user.id} deleted account`,
      additionalInfo: JSON.stringify(deleteAccount),
      tags: ["DATABASE", "API"],
    });

    return deleteAccount;
  } catch (error) {
    console.error(error);
    logEvent({
      message: `User ${ctx.session?.user.id} failed to delete account`,
      additionalInfo: JSON.stringify(error),
      tags: ["DATABASE", "API"],
    });
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to delete user data",
    });
  }
});

export default deleteAccount;
