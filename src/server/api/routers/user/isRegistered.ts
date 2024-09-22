import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { authedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const isRegistered = authedProcedure
  .input(
    z.object({
      userId: z.string(),
    }),
  )
  .query(async ({ input }) => {
    try {
      const [isRegistered] = await db
        .select({
          registered: users.registered,
        })
        .from(users)
        .where(eq(users.id, input.userId))
        .limit(1);
      if (!isRegistered) {
        return false;
      }
      return isRegistered?.registered ? true : false;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to check if user is registered",
      });
    }
  });

export default isRegistered;
