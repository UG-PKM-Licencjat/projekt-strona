import { CopyX } from "lucide-react";
import { l } from "node_modules/nuqs/dist/serializer-D6QaciYt";

describe("Offer creation", function () {
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

  it("desktop - should create account and offer", () => {
    cy.viewport("macbook-15");
    cy.get("#radix-\\:R1abcq\\:").click();
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

    cy.get(":nth-child(1) > .text-lg").click();
    cy.get(":nth-child(2) > .text-lg").click();
    cy.get(":nth-child(1) > .text-lg").click();

    cy.get(".justify-between > .bg-neo-pink").click();
    cy.get(".container > .flex > .select-none").click();
    cy.get(".container > .flex > .select-none").click();
    cy.get(".container > .flex > .select-none").click();
    cy.get(".container > .flex > .select-none").click();
    cy.get(".container > .flex > .select-none").click();
    cy.get(".container > .flex > .bg-neo-sea").click();
    cy.get(".group").should("be.visible");

    cy.contains("Tytuł i krótki opis").click();
    cy.get("input").first().type("testowa oferta!");
    cy.get("textarea").type("testowy opis!!!!");
    cy.contains("Główny opis").click();
    cy.get(".is-empty").type("testowy długi opis");
    cy.get(".flex-grow > :nth-child(3)").click();
    cy.get(".tiptap > p").type("BOLD");
    cy.get("strong").should("contain.text", "BOLD");
    cy.get("button.w-9").click();
    cy.get("#url").type(
      "https://www.youtube.com/watch?v=oHfKURVUCnc&themeRefresh=1",
    );
    cy.get("#add").click();
    cy.get("iframe").should("be.visible");

    cy.contains("Tagi").click();
    cy.get("button > .flex").click();
    cy.get(":nth-child(3) > p").click();
    cy.get(".flex-wrap").children().should("have.length", 1);
    cy.get("button > .flex").click();
    cy.get(".flex-wrap > :nth-child(1) > .flex > svg").click();
    cy.get(".flex-wrap").children().should("have.length", 0);
    cy.get("button > .flex").type("gitara");
    cy.get(":nth-child(3) > p").click();
    cy.get(".flex-wrap").children().should("have.length", 1);

    cy.contains("Podsumowanie").click();
    cy.contains("gitara klasyczna").should("exist");
  });

  it("mobile - should create account and offer", () => {
    cy.viewport("iphone-se2");
    cy.get(".bottom-0 > .items-center > button >").click();
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
    cy.get(":nth-child(1) > .text-lg").click();
    cy.get(":nth-child(2) > .text-lg").click();
    cy.get(":nth-child(1) > .text-lg").click();
    cy.get(".justify-between > .bg-neo-pink").click();

    cy.get(".container > .flex > .select-none").click();
    cy.get(".container > .flex > .select-none").click();
    cy.get(".container > .flex > .select-none").click();
    cy.get(".container > .flex > .select-none").click();
    cy.get(".container > .flex > .select-none").click();
    cy.get(".container > .flex > .bg-neo-sea").click();
    cy.get(".group").should("be.visible");
    cy.get(".group > .absolute").click();

    cy.get(".gap-4 > .flex-col > :nth-child(1)").click();
    cy.get("input").first().type("testowa oferta!");
    cy.get("textarea").type("testowy opis!!!!");
    cy.get(".flex.shrink-0 > .flex-col > :nth-child(2)").click();
    cy.get(".is-empty").type("testowy długi opis");
    cy.get(".flex-grow > :nth-child(3)").click();
    cy.get(".tiptap > p").type("BOLD");
    cy.get("strong").should("contain.text", "BOLD");
    cy.get(".lucide-ellipsis-vertical").click();
    // youtube
    cy.get(":nth-child(6) > .h-9").click();
    cy.get("#url").type(
      "https://www.youtube.com/watch?v=oHfKURVUCnc&themeRefresh=1",
    );
    cy.get("#add").click();
    cy.get("iframe").should("be.visible");

    cy.get(".flex.shrink-0 > .flex-col > :nth-child(3)").click();
    cy.get("button > .flex").click();
    cy.get(":nth-child(3) > p").click();
    cy.get("button > .flex").click();
    cy.get(".flex-wrap").children().should("have.length", 1);
    cy.get("button > .flex").click();
    cy.get(".flex-wrap > :nth-child(1) > .flex > svg").click();
    cy.get("button > .flex").click();
    cy.get(".flex-wrap").children().should("have.length", 0);
    cy.get("button > .flex").type("gitara");
    cy.get(":nth-child(3) > p").click();
    cy.get("button > .flex").click();
    cy.get(".flex-wrap").children().should("have.length", 1);

    cy.get(".flex.shrink-0 > .flex-col > :nth-child(6)").click();
    cy.contains("testowa oferta!").should("exist");
    cy.contains("gitara klasyczna").should("exist");
  });
});
