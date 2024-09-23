import { eq } from "drizzle-orm";
import { z } from "zod";
import { offers } from "~/server/db/schema";
import { authedProcedure } from "~/server/api/trpc";

const getByIdProcedure = authedProcedure
  .input(z.string())
  .query(async ({ ctx, input: offerId }) => {
    const fetchedOffer = await ctx.db.query.offers.findFirst({
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
