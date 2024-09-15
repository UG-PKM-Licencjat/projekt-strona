import { createTRPCRouter } from "~/server/api/trpc";
import  putRegistrationDataProcedure  from "~/server/api/routers/user/putRegistrationData";



export const UserRouter = createTRPCRouter({
    putRegistrationData: putRegistrationDataProcedure,
    
});
