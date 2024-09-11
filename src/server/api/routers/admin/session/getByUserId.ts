import { adminProcedure, procedure } from "~/server/api/trpc";
import { sessions } from "~/server/db/schema";
import { eq, count, getTableColumns } from "drizzle-orm";
import { db } from "~/server/db";
import { z } from "zod";
import logEvent from "~/server/log";

const getByUserIdProcedure = procedure
  .input(
    z.object({
      userId: z.string(),
    }),
  )
  .query(async ({ input }) => {
    logEvent("Fetching sessions by userId", input.userId);
    const fetchedSessions = await db.query.sessions.findMany({
      where: eq(sessions.userId, input.userId),
    });
    return fetchedSessions;
  });

export default getByUserIdProcedure;
