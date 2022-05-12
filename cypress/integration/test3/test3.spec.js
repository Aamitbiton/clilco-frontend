const user = "test2";
const pass = "123456";
const aaa = Cypress.env("CYPRESS_BASE_URL");

describe(`test webrtc with user ${user}`, () => {
  it("should CYPRESS_BASE_URL", function () {
    cy.visit("https://www.google.com/");
    console.log(
      "***************************************************************"
    );
    cy.get(`[data_cy=${aaa}]`).click();
  });

  it("should test", function () {
    cy.get(`[data_cy=${Cypress.env("TEST")}]`).click();
  });
});
