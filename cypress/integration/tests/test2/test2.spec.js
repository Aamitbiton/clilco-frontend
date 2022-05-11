// todo: לאפשר שני טסטים במקביל
//  https://docs.cypress.io/guides/guides/parallelization#Overview

const email = "test2@gmail.com";
const pass = "123456";
const url = "http://localhost:3000/";

describe("test webrtc with user test1", () => {
  it("should login with username and password", function () {
    cy.wait(60000);
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
    cy.get("[data_cy=lobby-back-btn]").should("exist");
    cy.wait(60000);
    cy.get("[data_cy=lobby-back-btn]").should("not.exist");
    cy.get("[data_cy=remote-video]").should("exist");
  });

  it("should end the video", function () {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false; // returning false here prevents Cypress from failing the test
    });
    cy.get("[data_cy=end-video-btn]").click();
    cy.get("[data_cy=after-date-page]").should("exist");
  });
});
