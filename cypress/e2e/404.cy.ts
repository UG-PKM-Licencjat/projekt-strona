describe("404 redirections", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.visit("/");
  });

  it("desktop - should show and go to home page", () => {
    cy.visit("/asdsadasd", { failOnStatusCode: false });
    cy.contains("Nie znaleźliśmy strony").should("be.visible");
    cy.get(".inline-flex > a").contains("Wróć na stronę główną").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });

  it("mobile - should show and go to home page", () => {
    cy.viewport("iphone-6");
    cy.visit("/asdsadasd", { failOnStatusCode: false });
    cy.contains("Nie znaleźliśmy strony").should("be.visible");
    cy.get(".inline-flex > a").contains("Wróć na stronę główną").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});
