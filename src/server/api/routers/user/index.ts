import { createTRPCRouter } from "~/server/api/trpc";
import putRegistrationDataProcedure from "~/server/api/routers/user/putRegistrationData";
import fetchManyProcedure from "./fetchMany";

export const UserRouter = createTRPCRouter({
  putRegistrationData: putRegistrationDataProcedure,
  fetchManyUsers: fetchManyProcedure,
});
