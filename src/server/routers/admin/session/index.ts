import { router } from "~/server/trpc";
import getByUserIdProcedure from "./getByUserId";

const SessionRouter = router({
  getByUserId: getByUserIdProcedure,
});

export default SessionRouter;
