import { z } from "zod";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { adminProcedure, procedure } from "~/server/trpc";
import { eq } from "drizzle-orm";
import logEvent from "~/server/log";

const getByIdProcedure = procedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ input }) => {
    logEvent("Fetching user by id", input.id);
    const fetchedUser = await db.query.users.findFirst({
      where: eq(users.id, input.id),
    });
    return fetchedUser;
  });

export default getByIdProcedure;
