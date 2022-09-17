/// <reference types="cypress" />

describe("Login form", () => {
  before(() => {
    cy.logout();
    cy.visit("/sign-in");
  });

  it("Check UI", () => {
    cy.findByTestId("validation-error").should("not.exist");
    cy.findByTestId("submit-loading").should("not.exist");
    cy.findByTestId("login-box")
      .should("include.text", "Forgot password?")
      .and("include.text", "Don't have an account?")
      .and("include.text", "Log in with Facebook")
      .and("include.text", "Sign Up");
  });

  it("Fill login form", () => {
    cy.fixture("user-auth").then((data) => {
      const { login, password } = data;

      cy.findByTestId("login-username-input")
        .type(login)
        .should("have.value", login);
      cy.findByTestId("login-password-input")
        .type(password)
        .should("have.value", password);
    });
  });
  it("Toggle password show button", () => {
    const element = "login-password-input";

    cy.togglePassword(element, true);
    cy.togglePassword(element, false);
    cy.togglePassword(element, true);
    cy.togglePassword(element, false);
  });
  it("Submit login", () => {
    cy.findByTestId("submit-loading").should("not.exist");
    cy.findByTestId("validation-submit").click();
    cy.findByTestId("submit-loading").should("exist");
    cy.location("pathname", { timeout: 15 * 1000 }).should("eq", "/");
  });
});
