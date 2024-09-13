import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { authedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { eq} from "drizzle-orm";




 const putRegistrationData =  authedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        isArtist: z.boolean(),
        registrationStatus: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
       if(!ctx.session?.user.id) {
          return [];
       }
        console.log("your input", input);
        const fetchedUsers = await db
          .update(users)
          .set({
            firstName: input.firstName,
            lastName: input.lastName,
            isArtist: input.isArtist,
            registrationStatus: input.registrationStatus,
          })
          .where(eq(users.id, ctx.session?.user.id));

        console.log(fetchedUsers);
        return fetchedUsers;
      } catch (error) {
        console.log("Error fetching registration data", error);
        return [];
      }
    });

export default putRegistrationData;
