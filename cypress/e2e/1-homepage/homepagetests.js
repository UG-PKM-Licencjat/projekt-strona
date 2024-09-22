describe("Home Page Tests", () => {
  beforeEach(() => {
    // Otwiera stronę główną przed każdym testem
    cy.visit("/");
    cy.viewport("macbook-15");
  });

  it("should render the main title and subtitle", () => {
    // Sprawdza, czy główny nagłówek jest widoczny
    cy.contains("Poczuj rytm...").should("be.visible");

    // Sprawdza, czy podtytuł jest widoczny
    cy.contains("na weselu swojej córki").should("be.visible");
  });

  it("should display the piano image", () => {
    // Sprawdza, czy obrazek pianina jest widoczny
    cy.get('img[alt="playing piano"]').should("be.visible");
  });

  it("should render the small screen subtitle", () => {
    // Sprawdza, czy wersja podtytułu dla mniejszych ekranów jest widoczna
    cy.contains("Wyszukuj, bądź reklamuj muzykę").should("be.visible");
  });

  it("should display the girl pointing icon on large screens", () => {
    // Sprawdza, czy ikona jest obecna i ma odpowiednie atrybuty
    cy.get('svg[class="absolute right-14 h-full max-md:hidden"]').should(
      "be.visible",
    );
  });

  it("should have correct CSS classes for header and titles", () => {
    // Sprawdza, czy główny nagłówek ma odpowiednie klasy CSS
    cy.get("h1")
      .should("have.class", "text-5xl")
      .and("have.class", "font-bold");

    // Sprawdza, czy podtytuł ma odpowiednie klasy CSS
    cy.get("h2")
      .first()
      .should("have.class", "text-4xl")
      .and("have.class", "pl-10");
  });
});
