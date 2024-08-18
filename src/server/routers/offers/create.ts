import { procedure } from "~/server/trpc";
import { offerSchema } from "~/app/offers/create/schema";

const createProcedure = procedure.input(offerSchema).mutation(async (opts) => {
  const { input } = opts;
  console.log(input);
  return input;
});

export default createProcedure;
