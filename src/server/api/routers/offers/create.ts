import { procedure } from "~/server/api/trpc";
import { offerSchema } from "~/lib/offerSchema";
import { db } from "~/server/db";
import { offers, offerTags, users, userOffers } from "~/server/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import logEvent from "~/server/log";
import { TRPCError } from "@trpc/server";

const createProcedure = procedure
  .input(offerSchema.extend({ userId: z.string() }))
  .mutation(async (opts) => {
    const { input } = opts;
    const { userId, tags, price, ...filteredInput } = input;
    const parsedPrice = parseFloat(price);
    // TODO check if offer already exists to disallow duplicates
    const { data, error } = await db.transaction(async (tx) => {
      const [returned] = await tx
        .insert(offers)
        .values({ ...filteredInput, price: parsedPrice })
        .returning();

      if (!returned) {
        tx.rollback();
        return { data: null, error: "Failed to create offer" };
      }

      console.log("Returned: ", returned);

      await tx
        .insert(offerTags)
        .values(tags.map((tag) => ({ offerId: returned.id, tagId: tag.id })));

      console.log("Tags inserted");

      const [idExists] = await tx
        .select({ id: users.id })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (!idExists) {
        tx.rollback();
        return { data: null, error: "User does not exist" };
      }

      console.log("User exists: ", idExists);

      await tx.insert(userOffers).values({ userId, offerId: returned.id });

      console.log("User offers inserted");

      return { data: returned, error: null };
    });

    if (data) {
      logEvent({
        message: `User ${userId} created offer ${data?.id}`,
        additionalInfo: JSON.stringify(data),
      });
      return data;
    } else {
      logEvent(
        `Failed to create offer for user ${userId}`,
        JSON.stringify(error),
      );
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: error,
      });
    }
  });

export default createProcedure;
