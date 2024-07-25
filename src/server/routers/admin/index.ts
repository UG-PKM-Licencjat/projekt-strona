import { router } from "~/server/trpc";

import { UserRouter } from "./user";
import { SessionRouter } from "./session";

export const AdminRouter = router({
  users: UserRouter,
  sessions: SessionRouter,
});
