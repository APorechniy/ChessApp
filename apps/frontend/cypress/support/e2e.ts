import './commands';

// Отключаем нежелательные ошибки от Next.js
Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('Minified React error')) {
        return false;
    }
    return true;
});