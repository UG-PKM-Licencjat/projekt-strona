describe("h ", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport("macbook-15");
  });
  it("should redirect after clicking on the search button", () => {
    cy.get("a > .flex").click();
    cy.url().should("include", "/offers");
  });
  it("should start the registration process after clicking on the register button", () => {
    cy.visit("/");
    cy.get(".rounded-full").click();
    // should redirect to (any page) with different host than the current one url shouldn;t include currnet url
    cy.url().should("not.include", "localhost:3000");
  });
});
