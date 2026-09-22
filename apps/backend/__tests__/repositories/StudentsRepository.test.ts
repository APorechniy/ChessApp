import { StudentsRepository } from "../../src/repositories";
import { TestDataSource } from "../../src/config/test-ormconfig";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import studentsList from "../mock/students-list.json";
import { StudentView } from "../../src/entities/student-view.entity";

describe("Students Repository", () => {
    let studentsRepository: StudentsRepository;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        studentsRepository = new StudentsRepository(dataSource);
    })
    test("Get base students list", async () => {
        const mockedStudents = EntityMockHelper.asEntityArray(StudentView, studentsList);
        const students = await studentsRepository.getStudents()

        expect(students).toStrictEqual(mockedStudents);
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})