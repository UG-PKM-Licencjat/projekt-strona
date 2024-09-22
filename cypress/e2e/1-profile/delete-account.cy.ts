describe("Profile Edit Form - Successful Update", () => {
  beforeEach(() => {
    // test user cookies
    cy.visit("/profile");

    // cy.login();
  });
  it("should show error on submit", () => {
    cy.setCookie(
      "next-auth.session-token",
      "00afceb7-4b7c-49be-aa46-4466179d0360",
    );
    cy.setCookie(
      "next-auth.csrf-token",
      "8464e36d51898ac7fc10df664c9a1343ac8f6a163926608ac055f27c3fa99574%7C60f005a19a2c9646b009045793d4b7470d318eeeeff39d6c5d632955b43e5ee9",
    );

    cy.reload();
    cy.get('input[name="firstName"]').type("Ala");
    cy.get('input[name="lastName"]').type("Kot");
    cy.get("button[id='delete-account']").click();
    cy.get("h2").should("have.text", "Czy jesteś tego pewien?");
    cy.get("#confirm-delete").click();
    cy.url().should("include", "/");
  });
  //yes button click
  // cy.get(".justify-between > .inline-flex").click();
});
