import { AuthRepository } from "../../src/repositories";
import { AuthService } from "../../src/services";
import { TestDataSource } from "../../src/config/test-ormconfig";

describe("Auth Service", () => {
    let authService: AuthService;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const authRepository = new AuthRepository(dataSource);
        authService = new AuthService(authRepository)
    })
    // Возращает JWT пару, надо подумать
    // test("Get correct user", async () => {
    //     const login = "admin"
    //     const password = "qwerty1234"

    //     const resultUserId = "9d1fa2c3-9a0f-4b7e-98d9-6addbdcf6b1c"

    //     const userId = await authService.authUser(login, password)

    //     expect(userId).toStrictEqual(resultUserId);
    // })

    // test("Get correct student", async () => {
    //     const login = "Student_Studentov"
    //     const password = "12345678"

    //     const resultUserId = "bd40d71a-dbd2-4f43-873f-e6d767d722f3"

    //     const userData = await authService.authUser(login, password)

    //     expect(userData).toStrictEqual(resultUserId);
    // })

    test("Get incorrect user", async () => {
        const login = "admin"
        const password = "qwerty12"

        await expect(authService.authUser.call(authService, login, password)).rejects.toThrow();
    })

    test("Get incorrect user student", async () => {
        const login = "Student_Studentov"
        const password = "87654321"

        await expect(authService.authUser.call(authService, login, password)).rejects.toThrow();
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})