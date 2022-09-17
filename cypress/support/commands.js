// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import { attachCustomCommands } from "cypress-firebase";
import "@testing-library/cypress/add-commands";

const fbConfig = {
  apiKey: Cypress.env("apiKey"),
  authDomain: Cypress.env("authDomain"),
  projectId: Cypress.env("projectId"),
  storageBucket: Cypress.env("storageBucket"),
  messagingSenderId: Cypress.env("messagingSenderId"),
  appId: Cypress.env("appId"),
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });

Cypress.Commands.add("togglePassword", (element, show) => {
  cy.findByTestId("password-show")
    .should("have.text", show ? "Show" : "Hide")
    .click();

  cy.findByTestId(element).should(
    "have.attr",
    "type",
    !show ? "password" : "text"
  );
});

Cypress.Commands.add("checkProtectedRoute", (path, pathShouldEq = "/") => {
  cy.visit(path);
  cy.findByTestId("pending-logo").should("exist");
  cy.location("pathname", { timeout: 20 * 1000 }).should("eq", pathShouldEq);
  cy.findByTestId("pending-logo").should("not.exist");
});
