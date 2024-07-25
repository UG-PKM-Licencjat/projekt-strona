import { router } from "~/server/trpc";
import getByUserIdProcedure from "./getByUserId";

const AccountRouter = router({
  getByUserId: getByUserIdProcedure,
});

export default AccountRouter;
