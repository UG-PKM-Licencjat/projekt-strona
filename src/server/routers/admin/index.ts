import { router } from "~/server/trpc";

import UserRouter from "./user";
import SessionRouter from "./session";
import AccountRouter from "./account";
import OfferRouter from "./offer";

export const AdminRouter = router({
  users: UserRouter,
  sessions: SessionRouter,
  accounts: AccountRouter,
  offers: OfferRouter,
});
