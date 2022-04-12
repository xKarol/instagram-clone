/// <reference types="cypress" />

const userData = {
  email: "testuser@gmail.com",
  fullName: "Test User",
  username: "testuser",
  password: "testpass",
};

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
    cy.selectElement("register-email-input")
      .type(userData.email)
      .should("have.value", userData.email);
    cy.selectElement("register-fullname-input")
      .type(userData.fullName)
      .should("have.value", userData.fullName);
    cy.selectElement("register-username-input")
      .type(userData.username)
      .should("have.value", userData.username);
    cy.selectElement("register-password-input")
      .type(userData.password)
      .should("have.value", userData.password);
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
