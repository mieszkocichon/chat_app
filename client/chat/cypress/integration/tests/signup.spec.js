/// <reference types="cypress" />

context('Signup', () => {

  const credentials = {
    user1: {
      name: 'dcrfe43edrcfd34',
      username: 'dcrfe43edrcfd34',
      email: 'dcrfe43edrcfd34@dcrfe43edrcfd34.as',
      password: 'dcrfe43edrcfd34'
    }
  }

  it('Create account', () => {
    cy.visit('http://localhost:3000/signup');
    cy.get('.signup-name').type(credentials.user1.name).should('have.value', credentials.user1.name);
    cy.get('.signup-username').type(credentials.user1.username).should('have.value', credentials.user1.username);
    cy.get('.signup-email').type(credentials.user1.email).should('have.value', credentials.user1.email);
    cy.get('.signup-password-first').type(credentials.user1.password).should('have.value', credentials.user1.password);
    cy.get('.signup-password-second').type(credentials.user1.password).should('have.value', credentials.user1.password);
    cy.get('form').submit();
    cy.get('.siggned-success').should('be.visible');
    cy.get('.siggned-success').contains('You are siggned up now.');
  });

  it('Success login', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('.login_email_input')
      .type(credentials.user1.email)
      .should('have.value', credentials.user1.email);
    cy.get('.login_password_input')
      .type(credentials.user1.password)
      .should('have.value', credentials.user1.password);
    cy.get('form').submit();
  });
});
  