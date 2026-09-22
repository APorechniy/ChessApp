import { loginAndGoDashboard } from "../support/login";

describe('Авторизация', () => {
    it('должна успешно пройти авторизация', () => {
        loginAndGoDashboard(cy)
    });
});