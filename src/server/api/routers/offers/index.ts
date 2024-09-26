import { createTRPCRouter } from "~/server/api/trpc";

import CreateProcedure from "./create";
import GetByIdProcedure from "./getById";
import GetAllTagsProcedure from "./getAllTags";
import searchProcedure from "./search";
import checkByUserIdProcedure from "./checkByUserId";
import getByUserIdProcedure from "./getByUserId";
import updateProcedure from "./update";

export const OffersRouter = createTRPCRouter({
  getById: GetByIdProcedure,
  create: CreateProcedure,
  update: updateProcedure,
  getAllTags: GetAllTagsProcedure,
  search: searchProcedure,
  checkByUserId: checkByUserIdProcedure,
  getByUserId: getByUserIdProcedure,
});
