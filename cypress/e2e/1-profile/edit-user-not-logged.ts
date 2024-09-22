describe("Profile Edit user not logged", () => {
  beforeEach(() => {
    // Zakładamy, że użytkownik jest zalogowany
    // cy.login(); // Customowa komenda do zalogowania użytkownika
    cy.visit("/profile/"); // Otwieramy stronę z formularzem
  });

  it("should show error when firstName is too short", () => {
    cy.get('input[name="firstName"]').clear().type("A");
    cy.get('button[type="submit"]').click();
    cy.contains("Imię musi mieć co najmniej 2 znaki.").should("exist");
  });

  it("should show error when lastName is too short", () => {
    cy.get('input[name="lastName"]').clear().type("B");
    cy.get('button[type="submit"]').click();
    cy.contains("Nazwisko musi mieć co najmniej 2 znaki.").should("exist");
  });

  it("should show error for invalid characters in firstName", () => {
    cy.get('input[name="firstName"]').clear().type("Invalid@Name");
    cy.get('button[type="submit"]').click();
    cy.contains("Pseudonim zawiera nieprawidłowe znaki.").should("exist");
  });

  it("should show error for invalid characters in lastName", () => {
    cy.get('input[name="lastName"]').clear().type("Invalid@Surname");
    cy.get('button[type="submit"]').click();
    cy.contains("Nazwisko zawiera nieprawidłowe znaki.").should("exist");
  });
});
