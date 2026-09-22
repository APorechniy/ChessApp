import { AuthRepository, StudentsRepository, UserBalanceRepository } from "../../src/repositories";
import { TestDataSource } from "../../src/config/test-ormconfig";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import { StudentView } from "../../src/entities/student-view.entity";
import { StudentsService } from "../../src/services";
import studentsList from "../mock/students-list.json";

describe("Students Service", () => {
    let studentsService: StudentsService;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const authRepository = new AuthRepository(dataSource);
        const studentsRepository = new StudentsRepository(dataSource);
        const userBalanceRepository = new UserBalanceRepository(dataSource);
        studentsService = new StudentsService(authRepository, studentsRepository, userBalanceRepository);
    })
    test("Get base students list", async () => {
        const mockedStudents = EntityMockHelper.asEntityArray(StudentView, studentsList);

        const students = await studentsService.getStudents()

        expect(students).toStrictEqual(mockedStudents);
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})