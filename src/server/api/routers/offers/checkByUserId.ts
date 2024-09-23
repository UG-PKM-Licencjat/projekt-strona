import { authedProcedure } from "~/server/api/trpc";
import { offers, users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const checkByUserIdProcedure = authedProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ ctx, input }) => {
    if (!input.userId) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "UserId is required",
      });
    }

    const [user] = await ctx.db
      .select()
      .from(users)
      .where(eq(users.id, input.userId))
      .limit(1);

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User with provided Id does not exist",
      });
    }

    const [offer] = await ctx.db
      .select()
      .from(offers)
      .where(eq(offers.userId, input.userId))
      .limit(1);

    if (!offer) {
      return false;
    } else {
      return true;
    }
  });

export default checkByUserIdProcedure;
