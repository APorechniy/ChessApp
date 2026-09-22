export const loginAndGoDashboard = (cy: Cypress.cy & CyEventEmitter) => {
    cy.visit('/');
    cy.url().should('include', '/sign-in')
    cy.getByTestId('auth-form').should('be.visible');
    cy.getByTestId('login').should('have.attr', 'placeholder').and('match', /Логин/i)
    cy.getByTestId('password').should('have.attr', 'placeholder').and('match', /Пароль/i)

    cy.getByTestId('login').type('admin')
    cy.getByTestId('password').type('qwerty1234')
    cy.getByTestId('login-submit').click()

    cy.url().should('include', '/dashboard')
}