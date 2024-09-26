import { users } from "~/server/db/schema";
import { authedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import logEvent from "~/server/log";

const putRegistrationData = authedProcedure
  .input(
    z.object({
      firstName: z.string().max(25),
      lastName: z.string().max(25),
      image: z.string(),
      registered: z.boolean(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    try {
      if (!ctx.session?.user.id) {
        return [];
      }
      const putRegistrationData = await ctx.db
        .update(users)
        .set({
          name: input.firstName + " " + input.lastName,
          firstName: input.firstName,
          lastName: input.lastName,
          image: input.image,
          registered: input.registered,
        })
        .where(eq(users.id, ctx.session?.user.id));
      if (!putRegistrationData) {
        logEvent({
          message: `User ${ctx.session?.user.id} does not exist`,
          additionalInfo: JSON.stringify(putRegistrationData),
        });
        return new TRPCError({
          code: "NOT_FOUND",
          message: "User with provided Id does not exist",
        });
      }
      logEvent({
        message: `User ${ctx.session?.user.id} created profile`,
        additionalInfo: JSON.stringify(input),
      });
      return putRegistrationData;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to save user data",
      });
    }
  });

export default putRegistrationData;
