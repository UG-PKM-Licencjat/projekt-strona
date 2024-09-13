import { createTRPCRouter } from "~/server/api/trpc";

import { createProcedure } from "./create";

export const RatingsRouter = createTRPCRouter({
    create: createProcedure,
    delete:
    comment:
});
