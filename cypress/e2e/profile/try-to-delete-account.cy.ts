describe("Profile Edit Form - Successful Update", () => {
  beforeEach(() => {
    // test user cookies
    cy.visit("/profile");

    // cy.login();
  });
  it("should show error on submit", () => {
    // cy.get("body").should("be.visible");
    cy.setCookie(
      "next-auth.session-token",
      "30414c76-3028-435d-adda-204c025b8770",
    );
    cy.setCookie(
      "next-auth.csrf-token",
      "8464e36d51898ac7fc10df664c9a1343ac8f6a163926608ac055f27c3fa99574%7C60f005a19a2c9646b009045793d4b7470d318eeeeff39d6c5d632955b43e5ee9",
    );

    cy.get('input[name="firstName"]').type("Ala");
    cy.get('input[name="lastName"]').type("Kot");
    cy.get("#delete-account").click();
    cy.get("h2").should("have.text", "Czy jesteś tego pewien?");
    cy.get("#cancel-delete").click();
    cy.url().should("include", "/profile");
  });
  //yes button click
  // cy.get(".justify-between > .inline-flex").click();
});
