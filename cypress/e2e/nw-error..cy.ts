describe("Error Page", () => {
  context("Error", () => {
    const ErrorMsg = "There was a problem while loading the project data";

    it("simulates an error when dashboard cannot be displayed", () => {
      cy.intercept(
        {
          method: "POST",
          url: '/api/trpc/offers.countSearch,offers.search?batch=1&input={"0":{"json":{"text":"jgjghjghjg","location":""}},"1":{"json":{"text":"jgjghjghjg","location":"","skip":0,"limit":6}}}',
        },
        {
          forceNetworkError: true,
        },
      ).as("getNetworkFailure");

      cy.visit("/offers");
      cy.wait("@getNetworkFailure");
      cy.wait(10000);
      cy.contains(ErrorMsg).should("be.visible");
    });
  });
});
