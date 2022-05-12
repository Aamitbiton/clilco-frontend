const user = "test2";
const pass = "123456";

describe(`test webrtc with user ${user}`, () => {
  it("should CYPRESS_BASE_URL", function () {
    cy.visit("https://www.google.com/");
    cy.get(`[data_cy=${JSON.stringify(Cypress.env())}]`).click();
  });

  it("should test", function () {
    cy.get(`[data_cy=${Cypress.env("TEST")}]`).click();
  });
});
