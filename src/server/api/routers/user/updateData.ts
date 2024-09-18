import { authedProcedure } from "../../trpc";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import logEvent from "~/server/log";

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
      await db
        .update(users)
        .set({
          firstName: input.firstName,
          lastName: input.lastName,
          isArtist: input.isArtist,
        })
        .where(eq(users.id, ctx.session?.user.id));
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update user data",
      });
    }
  });

export default updateData;
