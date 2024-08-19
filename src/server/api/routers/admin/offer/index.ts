import { createTRPCRouter } from "~/server/api/trpc";
import getByUserIdProcedure from "./getByUserId";

const OfferRouter = createTRPCRouter({
  getByUserId: getByUserIdProcedure,
});

export default OfferRouter;
