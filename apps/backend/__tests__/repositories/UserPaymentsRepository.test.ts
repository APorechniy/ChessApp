import { TestDataSource } from "../../src/config/test-ormconfig";
import { UserPaymentsRepository } from "../../src/repositories";

describe("Users Payments Repository", () => {
    let userPaymentsRepository: UserPaymentsRepository;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        userPaymentsRepository = new UserPaymentsRepository(dataSource);
    })
    test("Get correct user id №1", async () => {
        const paymentId = "3016031a-000f-5001-8000-1ad195913a29"
        const expectedUserId = "bd40d71a-dbd2-4f43-873f-e6d767d722f3"

        const userData = await userPaymentsRepository.getUserIdByPaymentId(paymentId)

        expect(userData).toStrictEqual(expectedUserId);
    })

    test("Get correct user id №2", async () => {
        const paymentId = "3018a442-000f-5000-8000-1b92ac46c67b"
        const expectedUserId = "bd40d71a-dbd2-4f43-873f-e6d767d722f3"

        const userData = await userPaymentsRepository.getUserIdByPaymentId(paymentId)

        expect(userData).toStrictEqual(expectedUserId);
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})