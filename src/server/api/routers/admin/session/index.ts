import { createTRPCRouter } from "~/server/api/trpc";
import getByUserIdProcedure from "./getByUserId";

const SessionRouter = createTRPCRouter({
  getByUserId: getByUserIdProcedure,
});

export default SessionRouter;
