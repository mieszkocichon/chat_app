/// <reference types="cypress" />

context('Signup', () => {

  const credentials = {
    user1: {
      name: '21wewdw232wa45',
      username: '21wewdw232wa45',
      email: '21wewdw232wa45@21wewdw232wa45.as',
      password: 'y89u34ru84ji9r84ryuie39'
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

    cy.visit('http://localhost:3000/login');
    cy.get('.login_email_input').type(credentials.user1.email);
    cy.get('.login_password_input').type(credentials.user1.password);
    cy.get('form').submit();

    cy.visit('http://localhost:3000/');
  })

  // it('Create second account', () => {
  //   cy.visit('http://localhost:3000/signup');
  //   cy.get('.signup-name').type(credentials.user2.name).should('have.value', credentials.user2.name);
  //   cy.get('.signup-username').type(credentials.user2.username).should('have.value', credentials.user2.username);
  //   cy.get('.signup-email').type(credentials.user2.email).should('have.value', credentials.user2.email);
  //   cy.get('.signup-password-first').type(credentials.user2.password).should('have.value', credentials.user2.password);
  //   cy.get('.signup-password-second').type(credentials.user2.password).should('have.value', credentials.user2.password);
  //   cy.get('form').submit();
  //   cy.get('.siggned-success').should('be.visible');
  //   cy.get('.siggned-success').contains('You are siggned up now');
  // })
  // it('Send message from first account', () => {})
  // it('Verific first message and send message from second account', () => {})
  // it('Verific second message', () => {})
  // it('Delete accounts', () => {})
  
  //   // it('bad path witch bad password', () => {
  //   //   cy.get('.login_email_input')
  //   //     .type('asd32wsddrfeuol@asu0jioew.com')
  //   //     .should('have.value', 'asd32wsddrfeuol@asu0jioew.com');
  //   //   cy.get('.login_password_input')
  //   //     .type('111')
  //   //     .should('have.value', '111');
  //   //   cy.get('form').submit();
  //   // });
  
  //   // it('good path', () => {
  //   //   cy.get('.login_email_input')
  //   //     .type('asd32wsddrfeuol@asu0jioew.com')
  //   //     .should('have.value', 'asd32wsddrfeuol@asu0jioew.com');
  //   //   cy.get('.login_password_input')
  //   //     .type('123123123')
  //   //     .should('have.value', '123123123');
  //   //   cy.get('form').submit();
  //   // });
  });
  