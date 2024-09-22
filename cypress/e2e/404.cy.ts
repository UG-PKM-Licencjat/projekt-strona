describe("404 Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    //refresh page
    cy.reload();
  });
  it("should show 404 page", () => {
    cy.visit("/asdsadasd", { failOnStatusCode: false });
    cy.contains("Nie znaleźliśmy strony").should("be.visible");
  });
  it("should show go to home page", () => {
    cy.visit("/asdsadasd", { failOnStatusCode: false });
    cy.get(".inline-flex > a").contains("Wróć na stronę główną").click();
    // cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});
