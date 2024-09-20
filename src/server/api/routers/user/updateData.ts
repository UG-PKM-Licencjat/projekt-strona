import { authedProcedure } from "../../trpc";
import { db } from "~/server/db";
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
      isArtist: z.boolean(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const updateResult = await db
        .update(users)
        .set({
          firstName: input.firstName,
          lastName: input.lastName,
          isArtist: input.isArtist,
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
