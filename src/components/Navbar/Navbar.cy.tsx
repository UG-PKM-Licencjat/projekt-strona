import React from "react";
import { Navbar } from "./Navbar";

describe("Navbar Component - not logged", () => {
  beforeEach(() => {
    cy.mount(<Navbar session={null} />);
  });

  it("should display Google login button when user is not logged in", () => {
    cy.get("button").contains("Zaloguj się przez Google").should("be.visible");
  });

  it("should redirect to Google login when clicking login button", () => {
    cy.intercept("GET", "/api/auth/signin/google").as("googleLogin");

    cy.get("button").contains("Zaloguj się przez Google").click();

    cy.wait("@googleLogin").its("response.statusCode").should("eq", 200);
  });
});
