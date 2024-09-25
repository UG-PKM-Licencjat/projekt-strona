import { authedProcedure } from "../../trpc";
import { users } from "~/server/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import logEvent, { LogType } from "~/server/log";

const updateData = authedProcedure
  .input(
    z.object({
      firstName: z.string(),
      lastName: z.string(),
      avatar: z.string().optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const updateResult = await ctx.db
        .update(users)
        .set({
          name: input.firstName + " " + input.lastName,
          firstName: input.firstName,
          lastName: input.lastName,
          image: input.avatar,
        })
        .where(eq(users.id, ctx.session?.user.id))
        .returning();

      if (!updateResult) {
        logEvent({
          message: `User ${ctx.session?.user.id} does not exist`,
          additionalInfo: JSON.stringify(updateResult),
          logType: LogType.ERROR,
        });
        return new TRPCError({
          code: "NOT_FOUND",
          message: "User with provided Id does not exist",
        });
      }
    } catch (error) {
      logEvent({
        message: "Failed to update user data",
        additionalInfo: JSON.stringify(error),
        logType: LogType.ERROR,
      });

      return new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update user data",
      });
    }
  });
export default updateData;
