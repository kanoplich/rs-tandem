describe('Login page', () => {
  it('should login and go to Dashboard', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('Password123!');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});
