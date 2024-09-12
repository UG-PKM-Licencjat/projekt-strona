import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { authedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { eq, is } from "drizzle-orm";
import { cons } from "effect/List";
import { f } from "node_modules/@tanstack/query-core/build/modern/hydration-zFr_7WN8";



 const putRegistrationData =  authedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        image: z.string(),
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
            image: "https://www.google.com",
            isArtist: input.isArtist,
            registrationStatus: input.registrationStatus,
          })
          .where(eq(users.id, ctx.session?.user.id));

        
        console.log("User type updated");
        console.log(fetchedUsers);
        console.log("222222");
        return fetchedUsers;
      } catch (error) {
        console.log("eeeeeeeeeeeeeeeee")
        console.log("Error fetching registration data", error);
        return [];
      }
    });

export default putRegistrationData;
