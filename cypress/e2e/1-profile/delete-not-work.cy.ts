describe("Profile Edit Form - Successful Update", () => {
  beforeEach(() => {
    // test user cookies
    cy.visit("/profile");
  });
  it("should show error on submit", () => {
    cy.reload();
    cy.get('input[name="firstName"]').type("Ala");
    cy.get('input[name="lastName"]').type("Kot");
    cy.get("button[id='delete-account']").click();
    cy.get("h2").should("have.text", "Czy jesteś tego pewien?");
    cy.get("#confirm-delete").click();
    cy.get(".group").as("popout");
    cy.get("@popout").should("exist");
    cy.get("@popout")
      .find(".grid > .font-semibold")
      .should("have.text", "Błąd");
    cy.url().should("include", "/profile");
  });
  //yes button click
});
