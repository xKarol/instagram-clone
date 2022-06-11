/// <reference types="cypress" />

describe("Protected routes", () => {
  before(() => {
    cy.login();
    cy.visit("/sign-up");
  });

  it("The logged user cannot enter to sign-up page", () => {
    cy.checkProtectedRoute("/sign-up");
  });

  it("The logged user cannot enter to sign-in page", () => {
    cy.checkProtectedRoute("/sign-in");
  });

  it("The unlogged user can enter to home page", () => {
    cy.logout();
    cy.checkProtectedRoute("/");
  });

  it("The unlogged user can enter to user page", () => {
    cy.logout();
    cy.fixture("user-auth").then(({ username }) => {
      const pathname = `/${username}`;
      cy.checkProtectedRoute(pathname, pathname);
    });
  });
});
