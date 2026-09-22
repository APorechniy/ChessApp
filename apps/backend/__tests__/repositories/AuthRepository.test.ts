import { AuthRepository } from "../../src/repositories";
import { TestDataSource } from "../../src/config/test-ormconfig";

describe("Auth Repository", () => {
    let authRepository: AuthRepository;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        authRepository = new AuthRepository(dataSource);
    })
    test("Get correct user", async () => {
        const resultUserId = "9d1fa2c3-9a0f-4b7e-98d9-6addbdcf6b1c"

        const login = "admin"
        const password = "qwerty1234"

        const userData = await authRepository.authUser(login, password)

        expect(userData).toStrictEqual(resultUserId);
    })

    test("Get incorrect user", async () => {
        const login = "admin"
        const password = "qwerty12"

        await expect(authRepository.authUser.call(authRepository, login, password)).rejects.toThrow();
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy();
        done();
    })
})