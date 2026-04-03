describe('Reigster page', () => {
  const randomEmail = `testuser+${Date.now()}@example.com`;

  it('should register a new user and go to Dashboard', () => {
    cy.visit('http://localhost:5173/register');
    cy.get('input[name="name"]').type('Testuser');
    cy.get('input[name="email"]').type(randomEmail);
    cy.get('input[name="password"]').type('Password123!');
    cy.get('input[name="confirmPassword"]').type('Password123!');
    cy.get('[data-slot="button"]').contains('Зарегистрироваться').click();
    cy.url().should('include', '/dashboard');
  });
});
