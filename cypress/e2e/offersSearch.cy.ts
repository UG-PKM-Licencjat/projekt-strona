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

    cy.get(".flex-grow > .flex").should("be.visible");
    cy.get(".flex-grow > .flex").type("jazz");
    cy.get(".flex-grow > .flex").should("have.value", "jazz");
    cy.get(".grid").children().should("have.length", 1);

    cy.get(".flex-grow > .flex").clear();
    cy.get(".grid").children().should("have.length", 6);

    cy.get(".grid > :nth-child(1) > a").click();
    cy.contains("Główny opis").should("be.visible");

    cy.get(".items-center.justify-start > .select-none").click();
    cy.get(".grid").children().should("have.length", 6);
  });

  it("mobile - should redirect through navbar, use pagination on offers, search offer and redirect to offer", () => {
    cy.viewport("iphone-se2");
    cy.get('.justify-around > a[href="/search"]').click();

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

    cy.get(".flex-grow > .flex").should("be.visible");
    cy.get(".flex-grow > .flex").type("jazz");
    cy.get(".flex-grow > .flex").should("have.value", "jazz");
    cy.get(".grid").children().should("have.length", 1);

    cy.get(".flex-grow > .flex").clear();
    cy.get(".grid").children().should("have.length", 6);

    cy.get(".grid > :nth-child(1) > a").click();
    cy.contains("Główny opis").should("be.visible");

    cy.get(".items-center.justify-start > .select-none").click();
    cy.get(".grid").children().should("have.length", 6);
  });

  it("desktop - should redirect through main page search, use pagination on offers, search offer and redirect to offer", () => {
    cy.get(".flex-grow > .flex").should("be.visible");
    cy.get(".flex-grow > .flex").type("jazz");
    cy.get(".flex-col > .select-none").click();

    cy.get(".flex-grow > .flex").should("have.value", "jazz");
    cy.get(".grid").children().should("have.length", 1);

    cy.get(".flex-grow > .flex").clear();
    cy.get(".grid").children().should("have.length", 6);

    cy.get(".grid > :nth-child(1) > a").click();
    cy.contains("Główny opis").should("be.visible");

    cy.get(".items-center.justify-start > .select-none").click();
    cy.get(".grid").children().should("have.length", 6);
  });

  it("mobile - should redirect through main page button, use pagination on offers, search offer and redirect to offer", () => {
    cy.viewport("iphone-se2");
    cy.get("a > .select-none").click();

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

    cy.get(".flex-grow > .flex").should("be.visible");
    cy.get(".flex-grow > .flex").type("jazz");
    cy.get(".flex-grow > .flex").should("have.value", "jazz");
    cy.get(".grid").children().should("have.length", 1);

    cy.get(".flex-grow > .flex").clear();
    cy.get(".grid").children().should("have.length", 6);

    cy.get(".grid > :nth-child(1) > a").click();
    cy.contains("Główny opis").should("be.visible");

    cy.get(".items-center.justify-start > .select-none").click();
    cy.get(".grid").children().should("have.length", 6);
  });
});
