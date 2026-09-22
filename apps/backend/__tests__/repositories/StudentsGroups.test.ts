import { StudentsGroupsRepository } from "../../src/repositories";
import { TestDataSource } from "../../src/config/test-ormconfig";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import studentsGroupsList from '../mock/students-groups.json';
import studentsGroupById from '../mock/student-group-by-id.json';
import { StudentsGroupView } from "../../src/entities/students-group-view.entity";

describe("Students Groups Repository", () => {
    let studentsGroupsRepository: StudentsGroupsRepository;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        studentsGroupsRepository = new StudentsGroupsRepository(dataSource);
    })
    test("Get students groups", async () => {
        const mockedStudentGroups = EntityMockHelper.asEntityArray(StudentsGroupView, studentsGroupsList);
        const studentGroups = await studentsGroupsRepository.getStudentsGroups()

        expect(studentGroups).toStrictEqual(mockedStudentGroups);
    })

    test("Get students group by ID", async () => {
        const studentsGroupId = "8579e201-8977-4cb0-9e31-01e77447c843";
        const mockedStudentsGroupById = EntityMockHelper.asEntity(StudentsGroupView, studentsGroupById);
        const studentGroup = await studentsGroupsRepository.getStudentsGroupById(studentsGroupId)

        expect(studentGroup).toStrictEqual(mockedStudentsGroupById);
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})