import { procedure } from "~/server/trpc";

const createProcedure = procedure.mutation(async ({ input }) => {
  console.log(input);
  return input;
});

export default createProcedure;
