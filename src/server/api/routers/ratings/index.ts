import { createTRPCRouter } from "~/server/api/trpc";
import CreateProcedure from "./create";
import UpdateProcedure from "./update";

export const RatingsRouter = createTRPCRouter({
  create: CreateProcedure,
  update: UpdateProcedure,
});
