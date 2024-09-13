import { createTRPCRouter } from "~/server/api/trpc";
import CreateProcedure from "./create";
import getByUserAndOfferIdsProcedure from "./getByUserAndOfferIds";
import UpdateProcedure from "./update";

export const RatingsRouter = createTRPCRouter({
  getByUserAndOfferIds: getByUserAndOfferIdsProcedure,
  create: CreateProcedure,
  update: UpdateProcedure,
});
