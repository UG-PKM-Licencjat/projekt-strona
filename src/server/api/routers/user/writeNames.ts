import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { authedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { eq} from "drizzle-orm";



 const  putRegistrationData1Step =  authedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        image: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const fetchedUsers = await db
          .update(users)
          .set({
            firstName: input.firstName,
            lastName: input.lastName,
            image: input.image,
          })
          .where(eq(users.id, ctx.session?.user.id ?? ""));

        return fetchedUsers;
      } catch (error) {
        console.log("Error fetching registration data", error);
        return [];
      }
    });


export default putRegistrationData1Step;


