describe('Header', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.login();
  });

  it('goes to Main page', () => {
    cy.contains('a', 'Тренажёр интервью').click();
    cy.url().should('include', '/dashboard');
  });

  it('goes to Dashboard page', () => {
    cy.contains('a', 'Панель управления').click();
    cy.url().should('include', '/dashboard');
  });

  it('goes to Topics page', () => {
    cy.contains('a', 'Темы').click();
    cy.url().should('include', '/topics');
  });

  it('goes to History page', () => {
    cy.contains('a', 'История').click();
    cy.url().should('include', '/history');
  });

  it('goes to Profile page', () => {
    cy.contains('a', 'Профиль').click();
    cy.url().should('include', '/profile');
  });

  it('logs out', () => {
    cy.contains('button', 'Выход').click();
    cy.url().should('include', '/login');
  });
});
