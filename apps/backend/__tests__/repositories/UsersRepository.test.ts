import { UsersRepository } from "../../src/repositories";
import { TestDataSource } from "../../src/config/test-ormconfig";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import userCorrect from '../mock/user-correct.json'
import userStudentCorrect from '../mock/user-student-correct.json'
import { User } from "../../src/entities/user.entity";

describe("Users Repository", () => {
    let usersRepository: UsersRepository;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        usersRepository = new UsersRepository(dataSource);
    })
    test("Get correct user", async () => {
        const userId = "9d1fa2c3-9a0f-4b7e-98d9-6addbdcf6b1c"
        const mockedUserData = EntityMockHelper.asEntity(User, userCorrect as User)

        const userData = await usersRepository.getUserById(userId)

        expect(userData).toStrictEqual(mockedUserData);
    })

    test("Get correct student user", async () => {
        const userId = "bd40d71a-dbd2-4f43-873f-e6d767d722f3"
        const mockedUserData = EntityMockHelper.asEntity(User, userStudentCorrect as User)

        const userData = await usersRepository.getUserById(userId)

        expect(userData).toStrictEqual(mockedUserData);
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})