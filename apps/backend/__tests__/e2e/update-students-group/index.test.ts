import { AttendancesRepository, StudentsAttendedRepository, StudentsGroupsRepository, UserGroupsRepository } from "@/repositories";
import { TestDataSource } from "@/config/test-ormconfig";
import { StudentsGroupsService } from "@/services";
import { StudentsGroup, type StudentsGroupView } from "@/entities";
import { localToUtc } from "@/utils/local-to-utc";

describe("Update students group", () => {
    let studentsGroupsService: StudentsGroupsService;
    let studentsGroupId: string | undefined = "";

    const studentsGroupPreset: Omit<StudentsGroupView, "id"> = {
        "color": null,
        "description": "TESTGROUP",
        "name": "Тестовая группа JEST",
        "students": [
            {
                "firstName": "1",
                "id": "08d48887-34dd-4515-8135-7f506c1c8660",
                "lastName": "1"
            },
            {
                "firstName": "22",
                "id": "08f5a121-0310-4e6b-87e2-5fcbb071d4a9",
                "lastName": "22"
            }
        ]
    }

    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const attendancesRepository = new AttendancesRepository(dataSource);
        const studentsAttendedRepository = new StudentsAttendedRepository(dataSource);
        const studentsGroupsRepository = new StudentsGroupsRepository(dataSource);
        const userGroupsRepository = new UserGroupsRepository(dataSource);

        studentsGroupsService = new StudentsGroupsService(
            attendancesRepository,
            studentsAttendedRepository,
            studentsGroupsRepository,
            userGroupsRepository
        );
    })
    test("Update students group", async () => {
        // Создаем группу
        const isCreatedStudentsGroup = await studentsGroupsService.createStudentsGroup(studentsGroupPreset);
        expect(isCreatedStudentsGroup).toBeTruthy()

        // Проверяем что группа создалась
        const list = await studentsGroupsService.getStudentsGroups();
        expect(list).toContainEqual(expect.objectContaining({ ...studentsGroupPreset }));
        studentsGroupId = list?.find((sg) => sg.name === studentsGroupPreset.name)?.id
        expect(studentsGroupId).toBeTruthy()

        const fullStudentGroup = {
            id: studentsGroupId as string,
            description: "UPDATED GROUP",
            name: "Измененная группа JEST",
            students: [{
                "firstName": "1",
                "id": "08d48887-34dd-4515-8135-7f506c1c8660",
                "lastName": "1"
            }]
        }

        const utcDate = localToUtc(new Date().toISOString());
        const isUpdated = await studentsGroupsService.updateStudentsGroup(fullStudentGroup, utcDate)
        expect(isUpdated).toBeTruthy()

        const updatedList = await studentsGroupsService.getStudentsGroups();
        expect(updatedList).toContainEqual(expect.objectContaining({ ...fullStudentGroup }));
        const updatedStudentsGroupId = updatedList?.find((sg) => sg.name === fullStudentGroup.name)?.id
        expect(updatedStudentsGroupId).toBeTruthy()
        expect(updatedStudentsGroupId).toBe(studentsGroupId)
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        const studentsGroupsRepo = TestDataSource.getRepository(StudentsGroup)

        studentsGroupsRepo.delete({
            id: studentsGroupId
        })
            .then(() => {
                TestDataSource.destroy()
            })
            .finally(() => {
                done();
            })
    })
})