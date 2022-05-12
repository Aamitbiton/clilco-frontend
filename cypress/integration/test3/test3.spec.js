const user = "test2";
const pass = "123456";

describe(`test webrtc with user ${user}`, () => {
  it("should test", function () {
    cy.visit(Cypress.env("CYPRESS_BASE_URL"));
    cy.visit(Cypress.env("TEST"));
  });
});
