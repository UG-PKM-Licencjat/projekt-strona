import { createTRPCRouter } from "~/server/api/trpc";

import CreateProcedure from "./create";
import GetProcedure from "./get";
import GetAllTagsProcedure from "./getAllTags";
import searchProcedure from "./search";

export const OffersRouter = createTRPCRouter({
  get: GetProcedure,
  create: CreateProcedure,
  getAllTags: GetAllTagsProcedure,
  search: searchProcedure,
});
