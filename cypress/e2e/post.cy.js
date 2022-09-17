/// <reference types="cypress" />

describe("Post", () => {
  before(() => {
    cy.login();
    cy.visit("/");
  });

  it("Post should be visible", () => {
    cy.findAllByTestId("post").first().should("be.visible");
  });

  it("User can like post", () => {
    cy.findAllByTestId("post")
      .first()
      .within(() => {
        cy.findByTestId("post-likes-amount").then(($element) => {
          const initialAmount = $element.text();
          cy.findByTestId("post-like")
            .click()
            .should("have.class", "text-red")
            .click()
            .should("not.have.class", "text-red")
            .then(() => {
              expect(initialAmount).to.eq($element.text());
            });
        });
      });
  });

  const comment = "test" + Date.now();

  it("User can write comment", () => {
    cy.findAllByTestId("post")
      .first()
      .within(() => {
        cy.findByTestId("post-add-comment").within(() => {
          cy.findByRole("button", { name: /Post/i }).as("addButton");
        });
      })
      .as("post");

    cy.get("@addButton").should("not.have.value");
    cy.get("@addButton").should("be.disabled");

    cy.get("@post").within(() => {
      cy.findByTestId("post-add-comment")
        .find("input")
        .as("commentInput")
        .type(comment)
        .should("have.value", comment);
    });

    cy.get("@addButton").should("not.be.disabled");
    cy.get("@addButton").click();
    cy.get("@commentInput").should("not.have.value");
  });

  it("Written comment exist", () => {
    cy.findAllByTestId("post-comments-list")
      .first()
      .should("include.text", comment);
  });
});
