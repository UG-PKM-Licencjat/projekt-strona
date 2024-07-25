import { router } from "~/server/trpc";

import getUsersProcedure from "./getUsers";
import createUserProcedure from "./createUser";
import deleteUserProcedure from "./deleteUser";

export const AdminRouter = router({
  users: router({
    get: getUsersProcedure,
    create: createUserProcedure,
    delete: deleteUserProcedure,
  }),
});
