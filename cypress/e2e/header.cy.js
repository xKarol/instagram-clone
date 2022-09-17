/// <reference types="cypress" />

describe("Add new post", () => {
  before(() => {
    cy.visit("/");
    cy.logout();
  });

  it("header should be visible", () => {
    cy.findByTestId("header").should("be.visible");
  });

  it("logo should be visible", () => {
    cy.findByTestId("header").within(() =>
      cy.findByTestId("logo").should("be.visible")
    );
  });

  it("logo should have attr href", () => {
    cy.findByTestId("header").within(() =>
      cy.findByTestId("logo").should("have.attr", "href", "/")
    );
  });

  it("search bar should be visible", () => {
    cy.findByTestId("header").within(() =>
      cy.findByTestId("header-searchbar").should("be.visible")
    );
  });

  describe("Logged user", () => {
    before(() => {
      cy.login();
    });

    it("login and sign up buttons should not be visible", () => {
      cy.findByTestId("header").within(() => {
        cy.findByRole("button", { name: /Log In/i }).should("not.exist");
        cy.findByRole("button", { name: /Sign Up/i }).should("not.exist");
      });
    });

    it("navbar should be visible", () => {
      cy.findByTestId("header").within(() => {
        cy.findByRole("navigation").should("exist");
      });
    });

    it("navbar should have user avatar", () => {
      cy.findByTestId("header").within(() => {
        cy.findByRole("navigation").find("img").should("have.attr", "src");
      });
    });
  });

  describe("Unlogged user", () => {
    before(() => {
      cy.logout();
    });

    it("login and sign up buttons should be visible", () => {
      cy.findByTestId("header").within(() => {
        cy.findByRole("button", { name: /Log In/i }).should("be.visible");
        cy.findByRole("button", { name: /Sign Up/i }).should("be.visible");
      });
    });

    it("navbar should not be visible", () => {
      cy.findByTestId("header").within(() => {
        cy.findByRole("navigation").should("not.exist");
      });
    });

    it("user should be redirected after click auth buttons", () => {
      cy.findByTestId("header").within(() => {
        cy.findByRole("button", { name: /Log In/i }).click();
        cy.url({ timeout: 8000 }).should("include", "/sign-in");
        cy.visit("/");
      });
      cy.findByTestId("header").within(() => {
        cy.findByRole("button", { name: /Sign Up/i }).click();
        cy.url({ timeout: 8000 }).should("include", "/sign-up");
        cy.visit("/");
      });
    });
  });
});
