import { CoachesRepository, StudentsRepository, UsersRepository } from "../../src/repositories";
import { UsersService } from "../../src/services";
import { TestDataSource } from "../../src/config/test-ormconfig";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import userCorrect from '../mock/user-correct.json'
import userStudentFullCorrect from '../mock/user-student-full-correct.json'
import { User } from "../../src/entities/user.entity";
import { StudentView } from "../../src/entities/student-view.entity";
import { Student } from "../../src/entities/student.entity";

describe("Users Service", () => {
    let usersService: UsersService;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const usersRepository = new UsersRepository(dataSource);
        const coachesRepository = new CoachesRepository(dataSource);
        const studentsRepository = new StudentsRepository(dataSource);
        usersService = new UsersService(coachesRepository, studentsRepository, usersRepository)
    })
    test("Get correct user", async () => {
        const mockedUserData = EntityMockHelper.asEntity(User, userCorrect as User)
        const userId = "9d1fa2c3-9a0f-4b7e-98d9-6addbdcf6b1c"

        const userData = await usersService.getUserById(userId)

        expect(userData).toStrictEqual(mockedUserData);
    })

    // test("Get correct student user", async () => {
    //     const mockedUserData = EntityMockHelper.asEntity(User, userStudentFullCorrect as User)
    //     const userId = "bd40d71a-dbd2-4f43-873f-e6d767d722f3"

    //     const userData = await usersService.getUserById(userId)

    //     expect(userData).toStrictEqual(mockedUserData);
    // })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})