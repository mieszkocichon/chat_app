/// <reference types="cypress" />

context('Message', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/login');
    });
  
    it('Bad credentials login warning 111', () => {
      cy.get('.login_email_input').type('43ew43werfw34erft@43ew43werfw34erft.com').should('have.value', '43ew43werfw34erft@43ew43werfw34erft.com');
      cy.get('.login_password_input').type('123123123').should('have.value', '123123123');
      cy.get('form').submit();

      cy.get('.search-friend', {timeout: 4000}).type('asd32wsddrfeuol').should('have.value', 'asd32wsddrfeuol');
      cy.get('.search-friend-button').click();
      cy.get('.asd32wsddrfeuol', {timeout: 2000}).click();
      cy.get('.chat-input-message').type('Hello!').should('have.value', 'Hello!');
      cy.get('.button-message-send').click();
    });
  });
  