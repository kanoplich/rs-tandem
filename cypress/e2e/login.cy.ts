describe('Login page', () => {
  it('should login and go to Dashboard', () => {
    cy.viewport(1280, 720);
    cy.login();
  });
});
