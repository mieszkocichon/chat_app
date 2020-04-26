/// <reference types="cypress" />

context('Message', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/login');
    });
  
    it('Send message', () => {
      cy.get('.login_email_input').type('43ew43werfw34erft@43ew43werfw34erft.com').should('have.value', '43ew43werfw34erft@43ew43werfw34erft.com');
      cy.get('.login_password_input').type('123123123').should('have.value', '123123123');
      cy.get('form').submit();
      cy.get('.search-friend', {timeout: 4000}).type('asd32wsddrfeuol').should('have.value', 'asd32wsddrfeuol');
      cy.get('.search-friend-button').click();
      cy.get('.0-thread-id', {timeout: 2000}).click();
      cy.get('.0-thread-id', {timeout: 2000}).click();
      cy.get('.chat-input-message').type('Hello!').should('have.value', 'Hello!');
      cy.get('.button-message-send').click();
      cy.get('.message-container', {timeout: 2000}).should('have.text', 'Hello!');
      cy.get('.logout-button').click();
      cy.get('.login_email_input').type('asd32wsddrfeuol@asd32wsddrfeuol.com').should('have.value', 'asd32wsddrfeuol@asd32wsddrfeuol.com');
      cy.get('.login_password_input').type('123123123').should('have.value', '123123123');
      cy.get('form').submit();
      cy.get('.0-thread-id', {timeout: 2000}).click();
      cy.get('.message-container', {timeout: 2000}).should('have.text', 'Hello!');
    });
  });
  