import { UserBalanceRepository } from "../../src/repositories";
import { TestDataSource } from "../../src/config/test-ormconfig";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import userBalanceResponse from "../mock/user-balance.json"
import userBalanceAfterIncrementResponse from "../mock/user-balance-after-increment.json"
import { UserBalance } from "../../src/entities/user-balance.entity";

describe("User Balance Repository", () => {
    let userBalanceRepository: UserBalanceRepository;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        userBalanceRepository = new UserBalanceRepository(dataSource);
    })
    test("Get base user balance", async () => {
        const mockedUserBalance = EntityMockHelper.asEntity(UserBalance, userBalanceResponse)
        const userBalance = await userBalanceRepository.getUserBalance("bd40d71a-dbd2-4f43-873f-e6d767d722f3")

        expect(userBalance).toStrictEqual(mockedUserBalance);
    })

    test("Can not get user balance", async () => {
        await expect(userBalanceRepository.getUserBalance.call(userBalanceRepository, "9d1fa2c3-9a0f-4b7e-98d9-6addbdcf6b1c")).rejects.toThrow("SQL ERROR: Can not get user balance");
    })

    test("E2E: Change user balance", async () => {
        const userId = "bd40d71a-dbd2-4f43-873f-e6d767d722f3"
        const changeCost = 1500
        const mockedUserBalance = EntityMockHelper.asEntity(UserBalance, userBalanceResponse)
        const mockedUserBalanceAfterIncrement = EntityMockHelper.asEntity(UserBalance, userBalanceAfterIncrementResponse)

        // Проверяем базовую установку пользователя
        const userBalance = await userBalanceRepository.getUserBalance(userId)
        expect(userBalance).toStrictEqual(mockedUserBalance);

        // Инкрементим баланс
        await userBalanceRepository.incrementUserBalance(userId, changeCost);

        // Проверяем что баланс поменялся верно
        const userBalanceAfterIncrement = await userBalanceRepository.getUserBalance(userId);
        expect(userBalanceAfterIncrement).toStrictEqual(mockedUserBalanceAfterIncrement);

        // Декрементим баланс
        await userBalanceRepository.decrementUserBalance(userId, 1500);

        // Проверяем что баланс поменялся верно
        const userBalanceAfterDecrement = await userBalanceRepository.getUserBalance(userId)
        expect(userBalanceAfterDecrement).toStrictEqual(mockedUserBalance);
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})