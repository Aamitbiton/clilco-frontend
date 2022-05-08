// <reference types="cypress" />;
describe("login", () => {});
const email = "c@gmail.com";
const pass = "123456";
// beforeEach(() => {
//
// });

["test1", "test2", "test3"].forEach((userName) => {
  it("should login with username and password", function () {
    cy.visit("http://localhost:3000/");
    cy.get("[data_cy=login-with-email]").click();
  });
});
