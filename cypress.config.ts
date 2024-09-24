import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
  },
  // env: {
  //   googleClientId: process.env.GOOGLE_CLIENT_ID,
  //   googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //   googleRefreshToken: process.env.GOOGLE_REFREESH_TOKEN,
  // },
});
