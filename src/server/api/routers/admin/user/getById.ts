import { z } from "zod";
import { users } from "~/server/db/schema";
import { procedure } from "~/server/api/trpc";
import { eq } from "drizzle-orm";
import logEvent from "~/server/log";

const getByIdProcedure = procedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ ctx, input }) => {
    logEvent({ message: "Fetching user by id", additionalInfo: input.id });
    const fetchedUser = await ctx.db.query.users.findFirst({
      where: eq(users.id, input.id),
    });
    return fetchedUser;
  });

export default getByIdProcedure;
