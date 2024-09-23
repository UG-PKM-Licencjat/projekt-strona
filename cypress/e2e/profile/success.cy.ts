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
      "554a0218-2964-43de-a9cc-9775a39ca853",
    );
    cy.setCookie(
      "next-auth.csrf-token",
      "8464e36d51898ac7fc10df664c9a1343ac8f6a163926608ac055f27c3fa99574%7C60f005a19a2c9646b009045793d4b7470d318eeeeff39d6c5d632955b43e5ee9",
    );

    cy.reload();
    cy.get('input[name="firstName"]').type("Ala");
    cy.get('input[name="lastName"]').type("Kot");
    cy.get('button[type="submit"]').click();

    cy.get(".group").as("popout");
    cy.get("@popout").should("exist");
    cy.get("@popout")
      .find(".grid > .font-semibold")
      .should("have.text", "Sukces");
  });
});
