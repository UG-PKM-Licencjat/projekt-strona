import { procedure } from "~/server/api/trpc";
import { sessions } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import logEvent from "~/server/log";

const getByUserIdProcedure = procedure
  .input(
    z.object({
      userId: z.string(),
    }),
  )
  .query(async ({ ctx, input }) => {
    logEvent({
      message: "Fetching sessions by userId",
      additionalInfo: input.userId,
    });
    const fetchedSessions = await ctx.db.query.sessions.findMany({
      where: eq(sessions.userId, input.userId),
    });
    return fetchedSessions;
  });

export default getByUserIdProcedure;
