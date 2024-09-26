describe("Search page", () => {
  beforeEach(() => {
    const session = "test-session-token";
    cy.task("db:seed-session", true);
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

  it("desktop - should redirect through navbar, use pagination on offers, search offer and redirect to offer", () => {
    cy.get('a[href="/search"]').first().click();

    cy.contains("Wyniki wyszukiwania").should("be.visible");

    cy.get('input[placeholder="zespół weselny, gitara"]').should("be.visible");

    cy.get(".mt-8 > :nth-child(1)").should("be.disabled");
    cy.get(".mt-8 > :nth-child(3)").click();
    cy.get(".grid").children().should("have.length", 3);

    cy.get(".mt-8 > :nth-child(4)").should("be.disabled");
    cy.get(".mt-8 > :nth-child(2)").click();
    cy.get(".grid").children().should("have.length", 6);

    cy.get(".mt-8 > :nth-child(4)").click();
    cy.get(".grid").children().should("have.length", 3);
    cy.get(".mt-8 > :nth-child(4)").should("be.disabled");

    cy.get(".mt-8 > :nth-child(1)").click();
    cy.get(".grid").children().should("have.length", 6);
    cy.get(".mt-8 > :nth-child(1)").should("be.disabled");

    // cy.get('button[aria-label="Grid view"]').should("be.visible");
    // cy.get('button[aria-label="List view"]').should("be.visible");

    // cy.get('input[placeholder="Karol Piwowarek, gitara"]')
    //   .type("gitara")
    //   .should("have.value", "gitara");

    // cy.get('input[placeholder="Warszawa"]')
    //   .type("Warszawa")
    //   .should("have.value", "Warszawa");

    // cy.get("button").contains("Szukaj").click();

    // cy.get("h2").contains("Wyniki wyszukiwania").should("be.visible");

    // cy.get(".grid > :nth-child(1)").should("have.length.at.least", 1);

    // cy.get(".grid > :nth-child(1)").click();

    // cy.get("h2").contains("Oferta").should("be.visible");
  });

  //   it("desktop - should redirect and search offer", () => {
  //     cy.get('input[placeholder="Karol Piwowarek, gitara"]').should("be.visible");

  //     cy.get(".flex-grow > .flex").should("be.visible");

  //     cy.get("button").contains("Szukaj").should("be.visible");

  //     cy.get('button[aria-label="Grid view"]').should("be.visible");
  //     cy.get('button[aria-label="List view"]').should("be.visible");
  //   });

  //   it("should search offers based on text and location", () => {
  //     cy.get('input[placeholder="Karol Piwowarek, gitara"]')
  //       .type("gitara")
  //       .should("have.value", "gitara");

  //     cy.get('input[placeholder="Warszawa"]')
  //       .type("Warszawa")
  //       .should("have.value", "Warszawa");

  //     cy.get("button").contains("Szukaj").click();

  //     cy.get("h2").contains("Wyniki wyszukiwania").should("be.visible");

  //     cy.get(".grid > :nth-child(1)").should("have.length.at.least", 1);
  //   });

  //   it("should search offers based on text and location", () => {
  //     cy.viewport("iphone-se2");
  //     cy.get('input[placeholder="Karol Piwowarek, gitara"]')
  //       .type("gitara")
  //       .should("have.value", "gitara");

  //     cy.get('input[placeholder="Warszawa"]')
  //       .type("Warszawa")
  //       .should("have.value", "Warszawa");

  //     cy.get("button").contains("Szukaj").click();

  //     cy.get("h2").contains("Wyniki wyszukiwania").should("be.visible");

  //     cy.get(".grid > :nth-child(1)").should("have.length.at.least", 1);
  //   });
});
