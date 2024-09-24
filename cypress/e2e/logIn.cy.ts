describe("Google", function () {
  beforeEach(function () {
    cy.visit("/");
    cy.loginByGoogleApi();
  });

  it("shows onboarding", function () {
    cy.getAllCookies();
  });
});
