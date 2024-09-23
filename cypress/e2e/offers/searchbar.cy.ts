describe("Search Page - Initial Load", () => {
  beforeEach(() => {
    // Otwieramy stronę wyszukiwania
    cy.visit("/offers"); // Upewnij się, że ścieżka jest poprawna
  });

  it("should load the search page with all elements", () => {
    // Sprawdź czy pole wyszukiwania jest widoczne
    cy.get('input[placeholder="Karol Piwowarek, gitara"]').should("be.visible");

    // Sprawdź czy pole lokalizacji jest widoczne
    cy.get('input[placeholder="Warszawa"]').should("be.visible");

    // Sprawdź czy przycisk "Szukaj" jest widoczny
    cy.get("button").contains("Szukaj").should("be.visible");

    // Sprawdź czy przełączniki widoków (grid/list) są widoczne
    cy.get('button[aria-label="Grid view"]').should("be.visible");
    cy.get('button[aria-label="List view"]').should("be.visible");
  });
});
