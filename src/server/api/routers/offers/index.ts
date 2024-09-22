import { createTRPCRouter } from "~/server/api/trpc";

import CreateProcedure from "./create";
import GetByIdProcedure from "./getById";
import GetAllTagsProcedure from "./getAllTags";
import searchProcedure from "./search";
import countSearchProcedure from "./countSearch";
import checkByUserIdProcedure from "./checkByUserId";

export const OffersRouter = createTRPCRouter({
  getById: GetByIdProcedure,
  create: CreateProcedure,
  getAllTags: GetAllTagsProcedure,
  search: searchProcedure,
  countSearch: countSearchProcedure,
  checkByUserId: checkByUserIdProcedure,
});
