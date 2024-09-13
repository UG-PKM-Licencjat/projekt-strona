import { createTRPCRouter } from "~/server/api/trpc";

import { createProcedure } from "./create";
import { deleteProcedure } from "./delete";

export const ReviewsRouter = createTRPCRouter({
  create: createProcedure,
  delete: deleteProcedure,
});
