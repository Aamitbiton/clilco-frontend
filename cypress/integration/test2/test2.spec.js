const user = "test2";
const pass = "123456";
const url = "https://clilco-webrtc-tests.web.app/";

describe(`test webrtc with user ${user}`, () => {
  it("should login with username and password", function () {
    cy.visit(url);
    cy.get("[data_cy=login-with-email]").click();
    cy.get("[data_cy=login-email-input]").type(user + "@gmail.com");
    cy.get("[data_cy=login-password-input]").type(pass);
    cy.get("[data_cy=login-with-email_login-btn]").click();
  });

  it("should be at home page and click to start dating", function () {
    cy.get("[data_cy=go-to-date-btn]").click();
  });

  it("should be at lobby", function () {
    cy.get("[data_cy=lobby-back-btn]").should("exist");
  });

  it("should be in video page", function () {
    cy.get("[data_cy=lobby-back-btn]", { timeout: 60000 }).should("not.exist");
    cy.get("[data_cy=video-date-page]", { timeout: 60000 }).should("exist");
  });

  it("should wait for the other user to end call", function () {
    console.log("***************************** waiting for other user");
    cy.get("[data_cy=after-date-page]", { timeout: 120000 }).should("exist");
  });
});
