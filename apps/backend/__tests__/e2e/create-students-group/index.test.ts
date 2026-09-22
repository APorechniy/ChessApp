import { AttendancesRepository, StudentsAttendedRepository, StudentsGroupsRepository, UserGroupsRepository } from "@/repositories";
import { TestDataSource } from "@/config/test-ormconfig";
import { StudentsGroupsService } from "@/services";
import { StudentsGroup, type StudentsGroupView } from "@/entities";

describe("Create students group", () => {
    let studentsGroupsService: StudentsGroupsService;

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
    test("Create students group", async () => {
        // Создаем группу
        let studentsGroupId: string | undefined = "";
        const isCreatedStudentsGroup = await studentsGroupsService.createStudentsGroup(studentsGroupPreset);
        expect(isCreatedStudentsGroup).toBeTruthy()

        // Проверяем что группа создалась
        const list = await studentsGroupsService.getStudentsGroups();
        expect(list).toContainEqual(expect.objectContaining({ ...studentsGroupPreset }));
        studentsGroupId = list?.find((sg) => sg.name === studentsGroupPreset.name)?.id
        expect(studentsGroupId).toBeTruthy()
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        const studentsGroupsRepo = TestDataSource.getRepository(StudentsGroup)

        studentsGroupsRepo.delete({
            name: studentsGroupPreset.name
        })
            .then(() => {
                TestDataSource.destroy()
            })
            .finally(() => {
                done();
            })
    })
})