describe(`test webrtc with user ${user}`, () => {
  it("should get variable", function () {
    cy.visit(Cypress.env("CYPRESS_BASE_URL"));
    console.log(Cypress.env("CYPRESS_BASE_URL"));
  });
});
