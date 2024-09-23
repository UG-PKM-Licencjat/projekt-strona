describe("h ", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport("macbook-15");
  });
  // it("should redirect after clicking on the search button", () => {
  //   cy.get("a > .flex").click();
  //   cy.url().should("include", "/offers");
  // });
  // it("should start the registration process after clicking on the register button", () => {
  //   cy.visit("/");
  //   cy.get(".rounded-full").click();
  //   // should redirect to (any page) with different host than the current one url shouldn;t include currnet url
  //   cy.url().should("not.include", "localhost:3000");
  // });

  it("should redirect after clicking on the login button", () => {
    cy.setCookie(
      "next-auth.session-token",
      "d0a1da30-d6fa-4853-8303-3d76daf19ea5",
    );
    cy.setCookie(
      "next-auth.csrf-token",
      "8464e36d51898ac7fc10df664c9a1343ac8f6a163926608ac055f27c3fa99574%7C60f005a19a2c9646b009045793d4b7470d318eeeeff39d6c5d632955b43e5ee9",
    );
    cy.visit("/");
    cy.get("#radix-\\:R1abj6\\:").should("be.visible");
    cy.get("#radix-\\:R1abj6\\:").click();
    cy.get("a[href='/profile'").should("have.text", "Profil");
    cy.get("a[href='/profile'").click();
    cy.url().should("include", "/profile");
    // clicking url doen't work na później
  });
  // it("should show 404 page", () => {
  //   cy.visit("/asdsadasd", { failOnStatusCode: false });
  //   cy.contains("Nie znaleźliśmy strony").should("be.visible");
  // });
  // it("should show go to home page from 404", () => {
  //   cy.visit("/asdsadasd", { failOnStatusCode: false });
  //   cy.get(".inline-flex > a").contains("Wróć na stronę główną").click();
  //   cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  // });
});
