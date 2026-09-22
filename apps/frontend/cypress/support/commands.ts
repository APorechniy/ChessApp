/// <reference types="cypress" />

// Кастомная команда для получения элемента по data-testid
Cypress.Commands.add('getByTestId', (testId: string) => {
    return cy.get(`[data-test-id="${testId}"]`);
});

// Кастомная команда для ожидания загрузки страницы
Cypress.Commands.add('waitForPageLoad', () => {
    cy.get('[data-test-id="page-loader"]').should('not.exist');
});

// Объявление типов для TypeScript
declare global {
    namespace Cypress {
        interface Chainable {
            login(email: string, password: string): Chainable<void>;
            getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
            waitForPageLoad(): Chainable<void>;
        }
    }
}

export { };