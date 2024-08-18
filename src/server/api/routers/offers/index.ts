import { createTRPCRouter } from "~/server/api/trpc";

import CreateProcedure from "./create";
import GetProcedure from "./get";

export const OffersRouter = createTRPCRouter({
  get: GetProcedure,
  create: CreateProcedure,
});
