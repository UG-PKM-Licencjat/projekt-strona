describe("404 Page iphone", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.visit("/");
  });
  it("should show and go to home page", () => {
    cy.visit("/asdsadasd", { failOnStatusCode: false });
    cy.contains("Nie znaleźliśmy strony").should("be.visible");
    cy.get(".inline-flex > a").contains("Wróć na stronę główną").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});
describe("404 Page macbook", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.visit("/");
  });
  it("should show and go to home page", () => {
    cy.visit("/asdsadasd", { failOnStatusCode: false });
    cy.contains("Nie znaleźliśmy strony").should("be.visible");
    cy.get(".inline-flex > a").contains("Wróć na stronę główną").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});
