import { createTRPCRouter } from "~/server/api/trpc";
import putRegistrationDataProcedure from "~/server/api/routers/user/putRegistrationData";
import updateData from "./updateData";

export const UserRouter = createTRPCRouter({
  putRegistrationData: putRegistrationDataProcedure,
  updateData: updateData,
});
