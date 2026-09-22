import { UserBalanceRepository } from "../../src/repositories";
import { UserBalanceService } from "../../src/services";
import { TestDataSource } from "../../src/config/test-ormconfig";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import userBalanceResponse from "../mock/user-balance.json"
import { UserBalance } from "../../src/entities/user-balance.entity";

describe("User Balance Repository", () => {
    let userBalanceService: UserBalanceService;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const userBalanceRepository = new UserBalanceRepository(dataSource);
        userBalanceService = new UserBalanceService(userBalanceRepository);
    })
    test("Get base user balance", async () => {
        const mockedUserBalance = EntityMockHelper.asEntity(UserBalance, userBalanceResponse);
        const userBalance = await userBalanceService.getUserBalance("bd40d71a-dbd2-4f43-873f-e6d767d722f3")

        expect(userBalance).toStrictEqual(mockedUserBalance);
    })

    test("Can not get user balance", async () => {
        await expect(userBalanceService.getUserBalance.call(userBalanceService, "9d1fa2c3-9a0f-4b7e-98d9-6addbdcf6b1c")).rejects.toThrow("SQL ERROR: Can not get user balance");
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})