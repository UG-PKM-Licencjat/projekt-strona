import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/server/db";
import { offers } from "~/server/db/schema";
import { procedure } from "~/server/api/trpc";

const getByIdProcedure = procedure
  .input(z.string())
  .query(async ({ input: offerId }) => {
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
      where: eq(offers.id, offerId),
    });

    if (!fetchedOffer) {
      return null;
    }

    const tags = fetchedOffer?.offerTags.map((tag) => tag.tag);

    const mappedOffer = { ...fetchedOffer, offerTags: tags };
    return mappedOffer;
  });

export default getByIdProcedure;
