import { createTRPCRouter } from "~/server/api/trpc";

import CreateProcedure from "./create";
import GetByIdProcedure from "./getById";
import GetAllTagsProcedure from "./getAllTags";
import searchProcedure from "./search";
import checkByUserIdProcedure from "./checkByUserId";
import getByUserIdProcedure from "./getByUserId";

export const OffersRouter = createTRPCRouter({
  getById: GetByIdProcedure,
  create: CreateProcedure,
  getAllTags: GetAllTagsProcedure,
  search: searchProcedure,
  checkByUserId: checkByUserIdProcedure,
  getByUserId: getByUserIdProcedure,
});
