import { AttendancesRepository, StudentsAttendedRepository, StudentsGroupsRepository, UserGroupsRepository } from "../../src/repositories";
import { TestDataSource } from "../../src/config/test-ormconfig";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import studentsGroupsList from '../mock/students-groups.json'
import { StudentsGroupView } from "../../src/entities/students-group-view.entity";
import { StudentsGroupsService } from "../../src/services";

describe("Students Groups service", () => {
    let studentsGroupsService: StudentsGroupsService;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const attendanceRepository = new AttendancesRepository(dataSource);
        const studentsAttendedRepository = new StudentsAttendedRepository(dataSource);
        const studentsGroupsRepository = new StudentsGroupsRepository(dataSource);
        const userGroupsRepository = new UserGroupsRepository(dataSource);
        studentsGroupsService = new StudentsGroupsService(
            attendanceRepository,
            studentsAttendedRepository,
            studentsGroupsRepository,
            userGroupsRepository
        );
    })
    test("Get students groups", async () => {
        const mockedStudentGroups = EntityMockHelper.asEntityArray(StudentsGroupView, studentsGroupsList);

        const studentGroups = await studentsGroupsService.getStudentsGroups()

        expect(studentGroups).toStrictEqual(mockedStudentGroups);
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})