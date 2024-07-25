import { procedure } from "~/server/trpc";
import { sessions, users } from "~/server/db/schema";
import { eq, count, getTableColumns } from "drizzle-orm";
import { db } from "~/server/db";
import logEvent from "~/server/log";

const getUsersProcedure = procedure.query(async ({ ctx }) => {
  // TODO: implement with pagination etc
  // console.log(ctx.session);
  try {
    const columns = getTableColumns(users);
    logEvent("Fetching users");

    const fetchedUsers = await db
      .select({
        ...columns,
        sessions_count: count(sessions.sessionToken),
      })
      .from(users)
      .leftJoin(sessions, eq(users.id, sessions.userId))
      .groupBy(users.id);
    return fetchedUsers;
  } catch (error) {
    console.log("Error fetching users", error);
    return [];
  }
});

export default getUsersProcedure;
