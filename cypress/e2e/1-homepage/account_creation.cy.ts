describe("Account Creation", () => {
  beforeEach(() => {
    // Zakładamy, że użytkownik nie jest zalogowany
    // cy.login(); // Customowa komenda do zalogowania użytkownika
    cy.visit("/createaccount"); // Otwieramy stronę z formularzem
    // cy.intercept("/api/auth/session", { fixture: "session.json" }).as(
    //   "session",
    // );

    const mockSession = {
      user: {
        name: "John Doe",
        email: "john@example.com",
        image: "https://example.com/john.jpg",
      },
      expires: "2024-01-01T00:00:00.000Z",
    };
    cy.intercept("GET", "/api/auth/session", {
      statusCode: 200,
      body: mockSession,
    }).as("getSession");
  });

  it("createaccpunt", () => {
    cy.intercept("/api/auth/session", { fixture: "session.json" }).as(
      "session",
    );

    cy.setCookie(
      "next-auth.session-token",
      "c4ca8cf3-38f0-43dd-84f9-895e00b6d8aa",
    );
    cy.setCookie(
      "next-auth.csrf-token",
      "54cb4c9d09e1a21341af0a7e11cc3bc32bb8dc91a9273672669fafd38185b970%7C15fff149c30ea26f6884e326c94b323b634b66158739e9c26e7e0cec623bd57b",
    );
    //refresh page
    cy.reload();

    cy.get('input[name="firstName"]').type("Ala");
    cy.get('input[name="lastName"]').type("Kot");
    cy.get('button[type="submit"]').click();
    cy.get(".mb-4").should("have.text", "Czy jesteś artystą?");
    cy.get("#undefined-form-item > :nth-child(2) > .text-lg").click();
    cy.get(".flex-col > .bg-neo-pink").click();
    cy.get(".mb-5").should("have.text", "To już wszystko!");
    cy.get(".inline-flex").click();
    cy.url().should("include", "/");
  });
});
