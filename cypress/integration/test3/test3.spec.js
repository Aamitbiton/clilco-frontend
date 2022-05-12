describe(`test webrtc with user ${user}`, () => {
  it("should login with username and password", function () {
    cy.visit(Cypress.env("CYPRESS_BASE_URL"));
    console.log(Cypress.env("CYPRESS_BASE_URL"));
    debugger;
  });
});
