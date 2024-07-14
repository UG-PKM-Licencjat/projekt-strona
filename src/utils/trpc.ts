import { createTRPCNext } from "@trpc/next";
import { type AppRouter } from "src/server/routers/_app";
import { httpBatchLink } from "@trpc/client";

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      links: [
        httpBatchLink({
          url: `http://localhost:3000/api/trpc`,
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
    };
  },
  ssr: true,
});
