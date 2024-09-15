import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { authedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const putRegistrationData = authedProcedure
  .input(
    z.object({
      firstName: z.string(),
      lastName: z.string(),
      isArtist: z.boolean(),
      registrationStatus: z.number(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    try {
      if (!ctx.session?.user.id) {
        return [];
      }
      console.log("your input", input);
      const fetchedUsers = await db
        .update(users)
        .set({
          firstName: input.firstName,
          lastName: input.lastName,
          isArtist: input.isArtist,
          registrationStatus: input.registrationStatus,
        })
        .where(eq(users.id, ctx.session?.user.id));
      return fetchedUsers;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to save user data",
      });
    }
  });

export default putRegistrationData;
