import { procedure } from "~/server/trpc";
import { sessions, users, userOffers, accounts } from "~/server/db/schema";
import { eq, count, getTableColumns } from "drizzle-orm";
import { db } from "~/server/db";
import logEvent, { LogType } from "~/server/log";

const getProcedure = procedure.query(async ({ ctx }) => {
  // TODO: implement with pagination etc
  // console.log(ctx.session);
  try {
    const columns = getTableColumns(users);
    logEvent("Fetching users");
    const fetchedUsers = await db
      .select({
        ...columns,
        sessions_count: count(sessions.sessionToken),
        offers_count: count(userOffers.offerId),
        accounts_count: count(accounts.providerAccountId),
      })
      .from(users)
      .leftJoin(sessions, eq(users.id, sessions.userId))
      .leftJoin(userOffers, eq(users.id, userOffers.userId))
      .leftJoin(accounts, eq(users.id, accounts.userId))
      .groupBy(users.id);
    return fetchedUsers;
  } catch (error) {
    logEvent("Failed to fetch users", LogType.ERROR);
    return [];
  }
});

export default getProcedure;
