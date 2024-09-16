import { adminProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { sessions, users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { z } from "zod";
import logEvent, { LogType } from "~/server/log";

const patchProcedure = adminProcedure
  .input(
    z.object({
      id: z.string(),
      firstname: z.string().optional(),
      lastname: z.string().optional(),
      nickname: z.string().optional(),
      shortDescription: z.string().optional(),
      longDescription: z.string().optional(),
      image: z.string().optional(),
      location: z.string().optional(),
    }),
  )
  .mutation(async ({ input }) => {
    logEvent({ message: "Deleting user", additionalInfo: input.id });
    const user = db.query.users.findFirst({ where: eq(users.id, input.id) });
    if (user === undefined) {
      logEvent({
        message: "User not found",
        additionalInfo: input.id,
        logType: LogType.ERROR,
      });
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }
    const updateData: Record<string, string> = {};
    if (input.firstname) updateData.firstName = input.firstname;
    if (input.lastname) updateData.lastName = input.lastname;
    if (input.nickname) updateData.nickname = input.nickname;
    if (input.shortDescription)
      updateData.shortDescription = input.shortDescription;
    if (input.longDescription)
      updateData.longDescription = input.longDescription;
    if (input.image) updateData.image = input.image;
    if (input.location) updateData.location = input.location;
    return await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, input.id))
      .returning();
  });

export default patchProcedure;
