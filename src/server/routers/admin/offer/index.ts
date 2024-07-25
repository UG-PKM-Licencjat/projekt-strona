import { router } from "~/server/trpc";
import getByUserIdProcedure from "./getByUserId";

const OfferRouter = router({
  getByUserId: getByUserIdProcedure,
});

export default OfferRouter;
