import { router } from "~/server/trpc";
import getByUserIdProcedure from "./getByUserId";

export const SessionRouter = router({
  getByUserId: getByUserIdProcedure,
});

export default SessionRouter;
