/// <reference types="cypress" />

const login = "testuser";
const password = "testpass";

describe("Login form", () => {
  before(() => {
    cy.visit("/sign-in");
  });

  it("Check UI", () => {
    cy.selectElement("validation-error").should("not.exist");
    cy.selectElement("submit-loading").should("not.exist");
    cy.selectElement("login-box")
      .should("include.text", "Forgot password?")
      .and("include.text", "Don't have an account?")
      .and("include.text", "Log in with Facebook")
      .and("include.text", "Sign Up");
  });

  it("Fill login form", () => {
    cy.selectElement("login-username-input")
      .type("testuser")
      .should("have.value", login);
    cy.selectElement("login-password-input")
      .type("testpass")
      .should("have.value", password);
  });
  it("Toggle password show button", () => {
    const togglePassword = (show = true) => {
      cy.selectElement("password-show")
        .should("have.text", show ? "Show" : "Hide")
        .click();

      cy.selectElement("login-password-input").should(
        "have.attr",
        "type",
        !show ? "password" : "text"
      );
    };
    togglePassword(true);
    togglePassword(false);
    togglePassword(true);
    togglePassword(false);
  });
  it("Submit login", () => {
    cy.selectElement("submit-loading").should("not.exist");
    cy.selectElement("validation-submit").click();
    cy.selectElement("submit-loading").should("exist");
    cy.location({ timeout: 10 * 1000 }).then((loc) => {
      expect(loc).to.eq("/");
    });
  });
});
