describe('Register page', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });
  it('should register a new user and go to Dashboard', () => {
    cy.visit('/register');
    cy.get('input[name="name"]').type('Testuser');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('Password123!');
    cy.get('input[name="confirmPassword"]').type('Password123!');
    cy.get('[data-slot="button"]').contains('Зарегистрироваться').click();
    cy.url().should('include', '/dashboard');
  });
});
