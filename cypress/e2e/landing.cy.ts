describe('Landing page', () => {
  it('should show "Начать бесплатно" and "Войти" buttons', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-slot="button"]').contains('Начать бесплатно').should('be.visible');
    cy.get('[data-slot="button"]').contains('Войти').should('be.visible');
  });

  it('"Начать бесплатно" navigates to registration page', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-slot="button"]').contains('Начать бесплатно').click();
    cy.url().should('include', '/register');
  });

  it('"Войти" navigates to login page', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-slot="button"]').contains('Войти').click();
    cy.url().should('include', '/login');
  });
});
