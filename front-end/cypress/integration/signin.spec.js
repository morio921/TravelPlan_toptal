describe('User Signin', () => {
  const user = Cypress.env('user');

  before(() => {
    cy.visit({
      url: '/signin',
    });
  });

  it('Require Password', () => {
    cy.get('[name="email"]').type(user.email);
    cy.get('[type="submit"]').click();
    cy.get('form').contains('This field is required');
  });

  it('Should signin successfully', () => {
    cy.get('[name="password"]').clear().type(user.password);
    cy.get('[type="submit"]').click();

    cy.url().should('include', '/records');
  });
});
