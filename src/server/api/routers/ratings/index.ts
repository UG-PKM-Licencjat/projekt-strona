import { createTRPCRouter } from "~/server/api/trpc";
import CreateProcedure from "./create";
import getByUserAndOfferIds from "./getByUserAndOfferIds";

export const RatingsRouter = createTRPCRouter({
  getByUserAndOfferIds: getByUserAndOfferIds,
  create: CreateProcedure,
  delete: DeleteProcedure,
});
