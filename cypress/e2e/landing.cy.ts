describe('Landing page', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });
  it('should show "Начать бесплатно" and "Войти" buttons', () => {
    cy.visit('/');
    cy.get('[data-slot="button"]').contains('Начать бесплатно').should('be.visible');
    cy.get('[data-slot="button"]').contains('Войти').should('be.visible');
  });

  it('"Начать бесплатно" navigates to registration page', () => {
    cy.visit('/');
    cy.get('[data-slot="button"]').contains('Начать бесплатно').click();
    cy.url().should('include', '/register');
  });

  it('"Войти" navigates to login page', () => {
    cy.visit('/');
    cy.get('[data-slot="button"]').contains('Войти').click();
    cy.url().should('include', '/login');
  });
});
