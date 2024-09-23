import { procedure } from "~/server/api/trpc";
import { sessions, users, accounts, offers } from "~/server/db/schema";
import { eq, count, getTableColumns } from "drizzle-orm";
import logEvent, { LogType } from "~/server/log";

const getProcedure = procedure.query(async ({ ctx }) => {
  // TODO: implement with pagination etc
  try {
    const columns = getTableColumns(users);
    logEvent({ message: "Fetching users" });
    const fetchedUsers = await ctx.db
      .select({
        ...columns,
        sessions_count: count(sessions.sessionToken),
        // TODO remake this as user can have only one offer now
        offers_count: count(offers.id),
        accounts_count: count(accounts.providerAccountId),
      })
      .from(users)
      .leftJoin(sessions, eq(users.id, sessions.userId))
      .leftJoin(offers, eq(users.id, offers.userId))
      .leftJoin(accounts, eq(users.id, accounts.userId))
      .groupBy(users.id);

    return fetchedUsers;
  } catch (error) {
    logEvent({ message: "Failed to fetch users", logType: LogType.ERROR });
    return [];
  }
});

export default getProcedure;
