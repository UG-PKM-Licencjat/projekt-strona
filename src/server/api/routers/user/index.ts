import { createTRPCRouter } from "~/server/api/trpc";
import  putRegistrationDataProcedure  from "~/server/api/routers/user/putRegistrationData";
import putRegistrationData1Step from "./writeNames";
import getRegistrationStep from "./getRegistrationStep";



export const UserRouter = createTRPCRouter({
    putRegistrationData: putRegistrationDataProcedure,
    write: putRegistrationData1Step,
    getRegistrationStep: getRegistrationStep,
});
