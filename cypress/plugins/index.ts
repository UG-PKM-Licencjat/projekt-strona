import { plugins } from "cypress-social-logins";

module.exports = (on, config) => {
  on("task", {
    GoogleSocialLogin: plugins.GoogleSocialLogin,
  });
};
