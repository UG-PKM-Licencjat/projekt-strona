describe("Search Page - Searching for Offers", () => {
  beforeEach(() => {
    cy.visit("/searcj");
  });

  it("should search offers based on text and location", () => {
    // Wpisz tekst wyszukiwania
    cy.get('input[placeholder="Karol Piwowarek, gitara"]')
      .type("gitara")
      .should("have.value", "gitara");

    // Wpisz lokalizację
    cy.get('input[placeholder="Warszawa"]')
      .type("Warszawa")
      .should("have.value", "Warszawa");

    // Kliknij przycisk "Szukaj"
    cy.get("button").contains("Szukaj").click();

    // Sprawdź, czy wyniki wyszukiwania są widoczne
    cy.get("h2").contains("Wyniki wyszukiwania").should("be.visible");

    // Sprawdź, czy karty ofert są widoczne (zależne od danych)
    cy.get(".grid > :nth-child(1)").should("have.length.at.least", 1);
  });
});
describe("Search Page - mobile", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.visit("/search");
  });
  it("should search offers based on text and location", () => {
    // Wpisz tekst wyszukiwania
    cy.get('input[placeholder="Karol Piwowarek, gitara"]')
      .type("gitara")
      .should("have.value", "gitara");

    // Wpisz lokalizację
    cy.get('input[placeholder="Warszawa"]')
      .type("Warszawa")
      .should("have.value", "Warszawa");

    // Kliknij przycisk "Szukaj"
    cy.get("button").contains("Szukaj").click();

    // Sprawdź, czy wyniki wyszukiwania są widoczne
    cy.get("h2").contains("Wyniki wyszukiwania").should("be.visible");

    // Sprawdź, czy karty ofert są widoczne (zależne od danych)
    cy.get(".grid > :nth-child(1)").should("have.length.at.least", 1);
  });
});
