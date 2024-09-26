describe("Account creation", function () {
  beforeEach(function () {
    const session = "test-session-token";
    cy.clearCookies();

    cy.task("db:seed-session", false);
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

  it("desktop - should create account", () => {
    cy.get("#radix-\\:R1abj6\\: > .relative > .aspect-square").click();
    cy.get("a[href='/createaccount']").click();
    cy.contains("Cieszymy się, że jesteś z nami!");
    cy.get("#\\:r2\\:-form-item").clear();
    cy.get(".select-none").click();
    cy.contains("Imię musi mieć co najmniej 2 znaki.");
    cy.get("#\\:r2\\:-form-item").type("tester");
    cy.get("#\\:r3\\:-form-item").clear();
    cy.get("#\\:r3\\:-form-item").type("Testwy");
    cy.get(".select-none").click();
    cy.get(".border-2").click();
    cy.get("#\\:r9\\:-form-item").type("{leftArrow}{leftArrow}o");
    cy.get(".select-none").click();
    cy.get(":nth-child(2) > .text-lg").click();
    cy.get(":nth-child(1) > .text-lg").click();
    cy.get(":nth-child(2) > .text-lg").click();
    cy.get(".justify-between > .bg-neo-pink").click();
    cy.contains("To już wszystko!");
    cy.get(".select-none").click();
    cy.get("#radix-\\:re\\: > .relative > .aspect-square").click();
    cy.get("a[href='/createaccount']").should("not.exist");
    cy.visit("/createaccount");
    cy.intercept("GET", "/api/auth/session", {
      fixture: "sessionCreated.json",
    });
    cy.contains("Cieszymy się, że jesteś z nami!").should("not.exist");
  });

  it("mobile - should create account", () => {
    cy.viewport("iphone-se2");
    cy.get(
      ".bottom-0 > .items-center > button > .relative > .aspect-square",
    ).click();
    cy.get("a[href='/createaccount']").click();
    cy.get("#\\:r0\\:-form-item").clear();
    cy.get(".select-none").click();
    cy.contains("Imię musi mieć co najmniej 2 znaki.");
    cy.get("#\\:r0\\:-form-item").type("tester");
    cy.get("#\\:r1\\:-form-item").clear();
    cy.get("#\\:r1\\:-form-item").type("Testwy");
    cy.get(".select-none").click();
    cy.get(".border-2").click();
    cy.get("#\\:r7\\:-form-item").type("{leftArrow}{leftArrow}o");
    cy.get(".select-none").click();
    cy.get(":nth-child(2) > .text-lg").click();
    cy.get(":nth-child(1) > .text-lg").click();
    cy.get(":nth-child(2) > .text-lg").click();
    cy.get(".justify-between > .bg-neo-pink").click();
    cy.contains("To już wszystko!");
    cy.get(".select-none").click();
    cy.get(
      ".bottom-0 > .items-center > button > .relative > .aspect-square",
    ).click();
    cy.get("a[href='/createaccount']").should("not.exist");
    cy.visit("/createaccount");
    cy.intercept("GET", "/api/auth/session", {
      fixture: "sessionCreated.json",
    });
    cy.contains("Cieszymy się, że jesteś z nami!").should("not.exist");
  });
});
