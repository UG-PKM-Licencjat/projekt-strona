import getProcedure from "./get";
import deleteProcedure from "./delete";
import patchProcedure from "./patch";
import getByIdProcedure from "./getById";
import { createTRPCRouter } from "~/server/api/trpc";

const UserRouter = createTRPCRouter({
  get: getProcedure,
  getById: getByIdProcedure,
  patch: patchProcedure,
  delete: deleteProcedure,
});

export default UserRouter;
