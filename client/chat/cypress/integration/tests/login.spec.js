/// <reference types="cypress" />

context('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('Bad credentials login warning', () => {
    cy.get('.login_email_input')
      .type('1swe4rweds@dwas32wz.pl')
      .should('have.value', '1swe4rweds@dwas32wz.pl');
    cy.get('.login_password_input')
      .type('123123123')
      .should('have.value', '123123123');
    cy.get('form').submit();
    cy.get('.bad-credentials', {timeout: 2000}).should('be.visible');
    cy.get('.bad-credentials').contains('Bad credentials!');
  });
});
