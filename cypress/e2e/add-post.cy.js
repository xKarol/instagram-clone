/// <reference types="cypress" />

describe("Add new post", () => {
  before(() => {
    cy.login();
    cy.visit("/");
  });

  it("Open modal", () => {
    cy.findByTestId("add-post-modal").should("not.exist");
    cy.findByTestId("add-post-btn").click({ timeout: 10 * 1000 });
    cy.findByTestId("add-post-modal").should("exist");
  });

  it("Find modal button", () => {
    cy.findByTestId("add-post-modal")
      .find("input[type='file']")
      .first()
      .should("have.attr", "hidden");
    cy.findByTestId("add-post-modal").should(
      "include.text",
      "Select from computer"
    );
  });

  it("Select file", () => {
    cy.readFile("assets/images/login-phone.png", null).then((file) => {
      expect(Cypress.Buffer.isBuffer(file)).to.be.true;
      cy.findByTestId("add-post-modal")
        .find("input[type='file']")
        .first()
        .selectFile(
          {
            contents: Cypress.Buffer.from(file),
            fileName: "file.png",
            mimeType: "text/plain",
            lastModified: Date.now(),
          },
          { force: true }
        );
    });
  });

  it("Go to next page", () => {
    cy.findByTestId("photo-upload-next").click();
  });

  it("Add caption", () => {
    const caption = "Test caption";
    cy.findByTestId("photo-upload-caption").type(caption);
    cy.findByTestId("photo-upload-caption-length").should(
      "include.text",
      caption.length
    );
  });

  it("Share post", () => {
    cy.findByTestId("photo-upload-next").click();
  });
});
