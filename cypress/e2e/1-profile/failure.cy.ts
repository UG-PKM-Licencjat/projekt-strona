describe("Profile Edit Form - Failure Update", () => {
  beforeEach(() => {
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
      .should("have.text", "Błąd");
  });
});
