import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "src/server/routers/_app";

export const trpc = createTRPCReact<AppRouter>({});
