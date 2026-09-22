import { loginAndGoDashboard } from "../support/login";

describe('Дашборд', () => {
    it('должны отобразиться данные клуба', () => {
        loginAndGoDashboard(cy);
        cy.visit('/dashboard');
        cy.url().should('include', '/dashboard');

        const contactsBlock = cy.getByTestId('contacts-block');

        contactsBlock.scrollIntoView();
        contactsBlock.should('be.visible');
        contactsBlock.getByTestId('tel').should('be.visible');
        contactsBlock.getByTestId('mail').should('be.visible');
        contactsBlock.getByTestId('legal-name').should('be.visible');
        contactsBlock.getByTestId('itin').should('be.visible');
    });
});