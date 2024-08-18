import { router } from "~/server/trpc";

import CreateProcedure from "./create";
import GetProcedure from "./get";

export const OffersRouter = router({
  get: GetProcedure,
  create: CreateProcedure,
});
