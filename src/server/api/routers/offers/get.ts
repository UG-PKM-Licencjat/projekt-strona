import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/server/db";
import { offers } from "~/server/db/schema";
import { procedure } from "~/server/api/trpc";

const getProcedure = procedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }) => {
    console.log("Fetching offer", input.id);
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
        userOffers: {
          columns: {
            userId: true,
            offerId: false,
          },
        },
      },
      where: eq(offers.id, input.id),
    });
    const tags = fetchedOffer?.offerTags.map((tag) => tag.tag);
    const mappedOffer = { ...fetchedOffer, offerTags: tags };
    console.log("Fetched offer", mappedOffer);
    return mappedOffer;
  });

export default getProcedure;
