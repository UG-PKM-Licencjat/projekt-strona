describe("Search page", () => {
  beforeEach(() => {
    const session = "test-session-token";
    cy.task("db:seed-session");
    cy.setCookie("next-auth.session-token", session, {
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
    cy.visit("/");

    cy.intercept("GET", "/api/auth/session", { fixture: "session.json" }).as(
      "session",
    );

    cy.intercept("GET", "https://chat-1-local.onrender.com/messages/*", []).as(
      "messagesSample",
    );
  });

  it("desktop - should redirect and search offer", () => {
    cy.get('input[placeholder="Karol Piwowarek, gitara"]').should("be.visible");

    cy.get(".flex-grow > .flex").should("be.visible");

    cy.get("button").contains("Szukaj").should("be.visible");

    cy.get('button[aria-label="Grid view"]').should("be.visible");
    cy.get('button[aria-label="List view"]').should("be.visible");
  });

  it("should search offers based on text and location", () => {
    cy.get('input[placeholder="Karol Piwowarek, gitara"]')
      .type("gitara")
      .should("have.value", "gitara");

    cy.get('input[placeholder="Warszawa"]')
      .type("Warszawa")
      .should("have.value", "Warszawa");

    cy.get("button").contains("Szukaj").click();

    cy.get("h2").contains("Wyniki wyszukiwania").should("be.visible");

    cy.get(".grid > :nth-child(1)").should("have.length.at.least", 1);
  });

  it("should search offers based on text and location", () => {
    cy.viewport("iphone-se2");
    cy.get('input[placeholder="Karol Piwowarek, gitara"]')
      .type("gitara")
      .should("have.value", "gitara");

    cy.get('input[placeholder="Warszawa"]')
      .type("Warszawa")
      .should("have.value", "Warszawa");

    cy.get("button").contains("Szukaj").click();

    cy.get("h2").contains("Wyniki wyszukiwania").should("be.visible");

    cy.get(".grid > :nth-child(1)").should("have.length.at.least", 1);
  });
});
