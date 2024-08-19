import { procedure } from "~/server/api/trpc";
import { offerSchema } from "~/utils/offerSchema";

const createProcedure = procedure.input(offerSchema).mutation(async (opts) => {
  const { input } = opts;
  console.log(input);
  return input;
});

export default createProcedure;
