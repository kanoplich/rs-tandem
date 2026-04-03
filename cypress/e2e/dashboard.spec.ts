describe('Dashboard page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('Password123!');
    cy.get('button[type="submit"]').click();
  });

  it('"Начать тренироваться" navigates to topics page', () => {
    cy.get('[data-slot="button"]').contains('Начать тренироваться').click();
    cy.url().should('include', '/topics');
  });
});
