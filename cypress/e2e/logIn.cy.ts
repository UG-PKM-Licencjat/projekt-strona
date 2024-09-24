describe("Google", function () {
  before(function () {
    const session = "test-session-token";
    cy.task("db:seed-session");
    cy.setCookie("next-auth.session-token", session, {
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
    cy.visit("/");
  });

  it("shows onboarding", function () {
    cy.getAllCookies();
  });
});
