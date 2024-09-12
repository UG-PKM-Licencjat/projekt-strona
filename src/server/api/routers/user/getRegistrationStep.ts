import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { authedProcedure } from "~/server/api/trpc";
import { eq} from "drizzle-orm";

const  getRegistationStep =  authedProcedure.query(async ({ ctx }) => {
    try {
      const step = await db
        .select({
          registrationStatus: users.registrationStatus,
        })
        .from(users)
        .where(eq(users.id, ctx.session?.user.id ?? ""));
      console.log("Fetched registration step", step);
      return step;
    } catch (error) {
      console.log("Error fetching registration data", error);
      return;
    }
  })

export default getRegistationStep;

