describe('User Signup', () => {
  const user = Cypress.env('user');

  before(() => {
    cy.visit('/signup');
  });

  it('Require Fields', () => {
    cy.get('[name="firstName"]').type(user.firstName);
    cy.get('[name="email"]').type(user.email);
    cy.get('[name="password"]').type(user.password);
    cy.get('[name="confirm_password"]').type(user.password);
    cy.get('[type="submit"]').click();

    cy.get('form').contains('This field is required');
  });

  it('Should signup successfully', () => {
    cy.get('[name="lastName"]').type(user.lastName);
    cy.get('[type="submit"]').click();

    cy.url().should('include', '/signin');
  });
});
