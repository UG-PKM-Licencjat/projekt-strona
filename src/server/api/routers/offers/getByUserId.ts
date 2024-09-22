import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/server/db";
import { offers } from "~/server/db/schema";
import { authedProcedure } from "~/server/api/trpc";

const getByUserIdProcedure = authedProcedure
  .input(z.string())
  .query(async ({ input: userId }) => {
    const fetchedOffer = await db.query.offers.findFirst({
      with: {
        offerTags: {
          columns: {
            tagId: false,
            offerId: false,
          },
          with: {
            tag: true,
          },
        },
        users: true,
      },
      where: eq(offers.userId, userId),
    });

    if (!fetchedOffer) {
      return null;
    }

    const tags = fetchedOffer?.offerTags.map((tag) => tag.tag);

    const mappedOffer = { ...fetchedOffer, offerTags: tags };
    return mappedOffer;
  });

export default getByUserIdProcedure;