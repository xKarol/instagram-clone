/// <reference types="cypress" />

describe("Post", () => {
  before(() => {
    cy.login();
    cy.visit("/");
  });

  it("User can like post", () => {
    cy.selectElement("post-likes-amount", { timeout: 15 * 1000 }).then(
      ($el) => {
        const amount = $el[0].innerText;

        cy.selectElement("post")
          .first()
          .find("[data-testid='post-like']")
          .click()
          .should("have.class", "text-red")
          .click()
          .should("not.have.class", "text-red")
          .then(() => {
            expect(amount).to.eq($el[0].innerText);
          });
      }
    );
  });

  const comment = "test" + Date.now();

  it("User can write comment", () => {
    cy.selectElement("post")
      .first()
      .find("[data-testid='post-add-comment']")
      .within(() => cy.findByRole("button", { name: /Post/i }).as("addButton"));

    cy.get("@addButton").should("be.disabled");

    cy.selectElement("post")
      .first()
      .find("[data-testid='post-add-comment'] input")
      .as("commentInput")
      .type(comment)
      .should("have.value", comment);

    cy.get("@addButton").should("not.be.disabled");
    cy.get("@addButton").click();
    cy.get("@commentInput").should("not.have.value");
  });

  it("Written comment exist", () => {
    cy.selectElement("post-comments-list")
      .first()
      .should("include.text", comment);
  });
});
