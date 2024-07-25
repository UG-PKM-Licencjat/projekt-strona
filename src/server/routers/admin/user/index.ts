import getProcedure from "./get";
import createProcedure from "./create";
import deleteProcedure from "./delete";
import getByIdProcedure from "./getById";
import { router } from "~/server/trpc";

const UserRouter = router({
  get: getProcedure,
  getById: getByIdProcedure,
  create: createProcedure,
  delete: deleteProcedure,
});

export default UserRouter;
