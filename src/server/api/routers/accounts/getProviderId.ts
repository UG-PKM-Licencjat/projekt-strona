import { z } from "zod";
import { authedProcedure } from "../../trpc";
import { accounts, offers, users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import logEvent from "~/server/log";
import { TRPCError } from "@trpc/server";

const getProviderId = authedProcedure
  .input(z.string()) // user Id
  .query(async ({ ctx, input }) => {
    const [result] = await ctx.db
      .select({
        providerAccountId: accounts.providerAccountId,
        name: users.name,
        image: users.image,
        offerId: offers.id,
      })
      .from(accounts)
      .leftJoin(users, eq(users.id, accounts.userId))
      .leftJoin(offers, eq(users.id, offers.userId))
      .where(eq(accounts.userId, input))
      .limit(1);

    if (!result) {
      logEvent({
        message: `User ${input} does not exist`,
      });
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User with provided Id does not exist",
      });
    }

    return result;
  });

export default getProviderId;
