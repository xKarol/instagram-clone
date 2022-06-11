/// <reference types="cypress" />

describe("Register form", () => {
  before(() => {
    cy.logout();
    cy.visit("/sign-up");
  });

  it("Check UI", () => {
    cy.selectElement("validation-error").should("not.exist");
    cy.selectElement("submit-loading").should("not.exist");
    cy.selectElement("register-box")
      .and("include.text", "Have an account?")
      .and("include.text", "Log In")
      .and("include.text", "Log in with Facebook");
  });

  it("Fill register form", () => {
    cy.fixture("user-auth").then((data) => {
      const { fullName, login: email, username, password } = data;

      cy.selectElement("register-email-input")
        .type(email)
        .should("have.value", email);
      cy.selectElement("register-fullname-input")
        .type(fullName)
        .should("have.value", fullName);
      cy.selectElement("register-username-input")
        .type(username)
        .should("have.value", username);
      cy.selectElement("register-password-input")
        .type(password)
        .should("have.value", password);
    });
  });

  it("Toggle password show button", () => {
    const element = "register-password-input";

    cy.togglePassword(element, true);
    cy.togglePassword(element, false);
    cy.togglePassword(element, true);
    cy.togglePassword(element, false);
  });
  it("Submit register", () => {
    cy.selectElement("submit-loading").should("not.exist");
    cy.selectElement("validation-submit").click();
    cy.selectElement("submit-loading").should("exist");
    cy.login();
    cy.location("pathname", { timeout: 15 * 1000 }).should("eq", "/");
  });
});
