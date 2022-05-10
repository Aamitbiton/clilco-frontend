// const url = "http://localhost:3000/"
const url = "https://clilco.web.app/";

describe("login", () => {});
const email = "test2@gmail.com";
const pass = "123456";

it("should login with username and password", function () {
  cy.visit(url);
  cy.get("[data_cy=login-with-email]").click();
  cy.get("[data_cy=login-email-input]").type(email);
  cy.get("[data_cy=login-password-input]").type(pass);
  cy.get("[data_cy=login-with-email_login-btn]").click();
});

it("should be at home page and click to start dating", function () {
  cy.get("[data_cy=go-to-date-btn]").click();
});

it("should be at lobby and then be in video", function () {
  cy.get("[data_cy=lobby-btn]").should("exist");
  cy.wait(60000);
  cy.get("[data_cy=lobby-btn]").should("not.exist");
  cy.get("[data_cy=remote-video]").should("exist");
});
