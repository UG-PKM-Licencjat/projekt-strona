import { createTRPCRouter } from "~/server/api/trpc";
import getByUserIdProcedure from "./getByUserId";

const AccountRouter = createTRPCRouter({
  getByUserId: getByUserIdProcedure,
});

export default AccountRouter;
