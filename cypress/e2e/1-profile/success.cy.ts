describe("Profile Edit Form - Successful Update", () => {
  beforeEach(() => {
    // test user cookies
    cy.setCookie(
      "next-auth.session-token",
      "c4ca8cf3-38f0-43dd-84f9-895e00b6d8aa",
    );
    cy.setCookie(
      "next-auth.csrf-token",
      "54cb4c9d09e1a21341af0a7e11cc3bc32bb8dc91a9273672669fafd38185b970%7C15fff149c30ea26f6884e326c94b323b634b66158739e9c26e7e0cec623bd57b",
    );

    // cy.login();
    cy.visit("/profile/");
  });
  it("should show error on submit", () => {
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
