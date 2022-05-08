// <reference types="cypress" />;
describe("login", () => {});
const email = "c@gmail.com";
const pass = "123456";
// beforeEach(() => {
//
// });

it("should login with username and password", function () {
  // cy.visit("http://localhost:3000/");
  cy.visit("https://clilco.web.app/");
  cy.get("[data_cy=login-with-email]").click();
});
