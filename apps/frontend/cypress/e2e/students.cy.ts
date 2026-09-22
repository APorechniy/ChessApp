import { loginAndGoDashboard } from "../support/login";

describe('Студенты', () => {
    it('должен отобразиться список студентов', () => {
        loginAndGoDashboard(cy);
        cy.visit('/dashboard');
        cy.url().should('include', '/dashboard')
        cy.getByTestId('students-card').should('be.visible');
        cy.getByTestId('students-card').children('div').children('h2').should('have.text', 'Ученики');
        cy.getByTestId('students-card').click()

        cy.url().should('include', '/students');
    });
});