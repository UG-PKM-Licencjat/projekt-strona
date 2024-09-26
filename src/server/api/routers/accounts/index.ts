import { createTRPCRouter } from "../../trpc";
import getProviderId from "./getProviderId";

export const AccountsRouter = createTRPCRouter({
  getProviderIdWithUserInfo: getProviderId,
});
