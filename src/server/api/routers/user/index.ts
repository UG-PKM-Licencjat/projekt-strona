import { createTRPCRouter } from "~/server/api/trpc";
import putRegistrationDataProcedure from "~/server/api/routers/user/putRegistrationData";
import updateData from "./updateData";
import fetchManyProcedure from "./fetchMany";
import deleteAccount from "./deleteAccount";

export const UserRouter = createTRPCRouter({
  putRegistrationData: putRegistrationDataProcedure,
  fetchManyUsers: fetchManyProcedure,
  updateData: updateData,
  delete: deleteAccount,
});
