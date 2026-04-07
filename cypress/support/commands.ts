Cypress.Commands.add('login', () => {
  cy.visit('/login');
  cy.get('input[name="email"]').type('user@example.com');
  cy.get('input[name="password"]').type('Password123!');
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');
});
