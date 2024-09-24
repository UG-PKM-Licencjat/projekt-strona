describe("Edit profile", function () {
  beforeEach(function () {
    const session = "test-session-token";
    cy.task("db:seed-session", true);
    cy.setCookie("next-auth.session-token", session, {
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
    cy.intercept("GET", "https://chat-1-local.onrender.com/messages/*", []).as(
      "messagesSample",
    );

    cy.intercept("GET", "/api/auth/session", {
      fixture: "sessionCreated.json",
    }).as("session");

    cy.visit("/");
  });

  it("desktop - should edit profile", () => {
    cy.get("#radix-\\:R1abj6\\: > .relative > .aspect-square").click();
    cy.get("a[href='/profile']").click();
    cy.contains("Edytuj profil");
    cy.get("#\\:r3\\:-form-item").clear();
    cy.get("#\\:r3\\:-form-item").type("nowytest");
    cy.get("#\\:r4\\:-form-item").clear();
    cy.get(".place-self-end > .select-none").click();
    cy.contains("Nazwisko zawiera nieprawidłowe znaki.").should;
    cy.get("#\\:r4\\:-form-item").type("Testowy");
    cy.get(".place-self-end > .select-none").click();
  });

  it("mobile - should edit profile", () => {
    cy.viewport("iphone-se2");
    cy.get(
      ".bottom-0 > .items-center > button > .relative > .aspect-square",
    ).click();
    cy.get("a[href='/profile']").click();
    cy.get("#\\:r0\\:-form-item").clear();
    cy.get("#\\:r0\\:-form-item").type("nowytest");
    cy.get("#\\:r1\\:-form-item").clear();
    cy.get(".place-self-end > .select-none").click();
    cy.contains("Nazwisko zawiera nieprawidłowe znaki.").should;
    cy.get("#\\:r1\\:-form-item").type("Testowy");
    cy.get(".place-self-end > .select-none").click();
  });

  it("desktop - should delete profile", () => {
    cy.get("#radix-\\:R1abj6\\: > .relative > .aspect-square").click();
    cy.get("a[href='/profile']").click();
    cy.contains("Usuń konto");
    cy.get("#delete-account").click();
    cy.contains("Czy jesteś tego pewien?");
    cy.get("button").contains("Nie").click();
    cy.get("#delete-account").click();
    cy.get("button").contains("Tak").click();
    cy.intercept("GET", "/api/auth/session", []);
    cy.visit("/");
    cy.get("#radix-\\:R1abj6\\: > .relative > .aspect-square").should(
      "not.exist",
    );
  });

  it("mobile - should delete profile", () => {
    cy.viewport("iphone-se2");
    cy.get(
      ".bottom-0 > .items-center > button > .relative > .aspect-square",
    ).click();
    cy.get("a[href='/profile']").click();
    cy.contains("Usuń konto");
    cy.get("#delete-account").click();
    cy.contains("Czy jesteś tego pewien?");
    cy.get("button").contains("Nie").click();
    cy.get("#delete-account").click();
    cy.get("button").contains("Tak").click();
    cy.intercept("GET", "/api/auth/session", []);
    cy.intercept("GET", "/api/auth/csrf", []);
    cy.visit("/");
    cy.get(
      ".bottom-0 > .items-center > button > .relative > .aspect-square",
    ).click();
    cy.get("a[href='/profile']").click();
    cy.contains("Usuń konto").should("not.exist");
  });
});
