/// <reference types="cypress" />

describe("Sidebar", () => {
  before(() => {
    cy.visit("/");
    cy.logout();
  });

  it("suggestions header text should be visible", () => {
    cy.findByRole("heading", { name: /Suggestions For You/i });
  });

  it("suggestions 'See All' button should be visible", () => {
    cy.findByRole("button", { name: /See All/i });
  });

  it("suggestions skeleton should have 5 items", () => {
    cy.findAllByTestId("suggested-skeleton").should("have.length", 5);
  });

  it("suggested profile item should have avatar, name and follow button", () => {
    cy.findAllByTestId("sidebar-suggested-profile").each(($element) => {
      cy.wrap($element).within(() => {
        cy.findByRole("figure").should("be.visible");
        cy.findByTestId("sidebar-suggested-profile-username")
          .first()
          .then(($element) => {
            const text = $element.text();
            cy.wrap($element)
              .should("be.visible")
              .should("have.text", text)
              .should("have.attr", "href", `/${text}`);
          });
        cy.findByRole("button", { name: /Following|Follow/i }).should(
          "be.visible"
        );
      });
    });
  });

  describe("Logged user", () => {
    before(() => {
      cy.login();
    });
    it("user avatar should be visible", () => {
      cy.findByTestId("sidebar-profile-avatar")
        .should("be.visible")
        .should("contain.html", "img");
    });
    it("username should be visible", () => {
      cy.findByTestId("sidebar-profile-username")
        .should("be.visible")
        .should("not.be.null");
    });
    it("username first and last name should be visible", () => {
      cy.findByTestId("sidebar-profile-username")
        .should("be.visible")
        .should("not.be.null");
    });

    it("profile switch button should be visible", () => {
      cy.findByRole("button", { name: /Switch/i }).should("be.visible");
    });

    it("suggested profile follow button should change after click", () => {
      cy.findAllByRole("button", { name: /Following|Follow/i })
        .first()
        .as("followButton");

      cy.get("@followButton").then(($element) => {
        const text = $element.text();
        const validText = text === "Following" ? "Follow" : "Following";
        cy.get("@followButton").click();
        cy.wrap($element).should("have.text", validText);
      });
    });
  });

  describe("Unlogged user", () => {
    before(() => {
      cy.logout();
    });

    it("profile header should not be visible", () => {
      cy.findByTestId("sidebar-profile").should("not.exist");
    });

    it("user can't click suggested item follow button", () => {
      cy.findAllByRole("button", { name: /Following|Follow/i })
        .first()
        .as("followButton");

      cy.get("@followButton").then(($element) => {
        const text = $element.text();
        cy.get("@followButton").click();
        cy.wrap($element).should("have.text", text);
      });
    });
  });
});
