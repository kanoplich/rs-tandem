describe('Dashboard page', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.login();
  });

  it('"Начать тренироваться" navigates to topics page', () => {
    cy.get('[data-slot="button"]').contains('Начать тренироваться').click();
    cy.url().should('include', '/topics');
  });
});
