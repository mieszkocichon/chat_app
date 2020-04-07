/// <reference types="cypress" />

context('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('bad path witch empty email', () => {
    cy.get('.login_password_input')
      .type('123123123')
      .should('have.value', '123123123');
    cy.get('form').submit();
  });

  // it('bad path witch bad password', () => {
  //   cy.get('.login_email_input')
  //     .type('asd32wsddrfeuol@asu0jioew.com')
  //     .should('have.value', 'asd32wsddrfeuol@asu0jioew.com');
  //   cy.get('.login_password_input')
  //     .type('111')
  //     .should('have.value', '111');
  //   cy.get('form').submit();
  // });

  // it('good path', () => {
  //   cy.get('.login_email_input')
  //     .type('asd32wsddrfeuol@asu0jioew.com')
  //     .should('have.value', 'asd32wsddrfeuol@asu0jioew.com');
  //   cy.get('.login_password_input')
  //     .type('123123123')
  //     .should('have.value', '123123123');
  //   cy.get('form').submit();
  // });
});
