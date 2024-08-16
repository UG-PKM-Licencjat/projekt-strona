import getProcedure from "./get";
import deleteProcedure from "./delete";
import patchProcedure from "./patch";
import getByIdProcedure from "./getById";
import { router } from "~/server/trpc";

const UserRouter = router({
  get: getProcedure,
  getById: getByIdProcedure,
  patch: patchProcedure,
  delete: deleteProcedure,
});

export default UserRouter;
