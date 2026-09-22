import {
    AttendanceAdditionalTasksRepository,
    AttendanceMainTasksRepository,
    AttendancePresetRepository,
    AttendancesRepository,
    SettingsRepository,
    StudentsAttendedRepository,
    StudentsBalanceTransactionRepository,
    StudentsGroupsRepository,
    UserBalanceRepository,
} from "@/repositories";
import { TestDataSource } from "@/config/test-ormconfig";
import { AttendancesService, StudentsAttendedService, UserBalanceService } from "@/services";
import { Attendance, AttendanceView, StudentsAttendedView, StudentsBalanceTransaction, UserBalance } from "@/entities";

describe("CRUD attendance", () => {
    let attendanceService: AttendancesService;
    let studentsAttendedService: StudentsAttendedService;
    let userBalanceService: UserBalanceService;
    let attendanceId: string;

    const attendancePreset: Omit<AttendanceView, "id"> = {
        "learningTopic": {
            "id": "fc7529f5-16c0-45fd-bd39-33c1d8fdaa00",
            "name": "Оппозиция",
            "level": {
                "id": "e1ec6640-d5df-44ea-a297-82bf2c715941",
                "name": "Базовый",
                "description": "Самый самый тестовый основной базовый уровень для масеньких",
                "hoursRequired": 20
            },
            "description": "изучаем понятие оппозиции"
        },
        "student": {
            "id": "b74a43c9-ece4-4402-a7ca-1eb1ee4279f9",
            "lastName": "Test3",
            "firstName": "Test3"
        },
        "group": null,
        "coach": {
            "id": "8ac70dc2-4993-4238-afd0-51e51093d474",
            "lastName": "Иванов",
            "firstName": "Иван"
        },
        "homeworkDone": true,
        "presetId": null,
        "quality": {
            "id": "daa7af83-c49a-4fa9-83a0-360ef0a9b888",
            "name": "GOOD",
            "label": "Хорошо",
            "darkColor": "#a2ff30",
            "lightColor": "#a2ff30"
        },
        "isOnline": false,
        "meetLink": null,
        "isFreeze": false,
        "type": "REGULAR",
        "isDeleted": false,
        "startDate": "2026-02-27T08:00:00Z",
        "endDate": "2026-02-27T09:00:00Z",
        "tasks": null,
        "additionalTasks": null
    }

    const oldStudent =
    {
        "id": "b74a43c9-ece4-4402-a7ca-1eb1ee4279f9",
        "lastName": "Test3",
        "firstName": "Test3"
    }

    const newStudent = {
        "firstName": "22",
        "id": "08f5a121-0310-4e6b-87e2-5fcbb071d4a9",
        "lastName": "22"
    }

    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const attendancesRepository = new AttendancesRepository(dataSource);
        const attendancesMainTasksRepository = new AttendanceMainTasksRepository(dataSource);
        const attendancesAdditionalTasksRepository = new AttendanceAdditionalTasksRepository(dataSource);
        const attendancePresetRepository = new AttendancePresetRepository(dataSource);
        const settingsRepository = new SettingsRepository(dataSource);
        const studentsAttendedRepository = new StudentsAttendedRepository(dataSource);
        const studentGroupsRepository = new StudentsGroupsRepository(dataSource);
        const studentBalanceRepository = new StudentsBalanceTransactionRepository(dataSource);
        const userBalanceRepository = new UserBalanceRepository(dataSource);

        studentsAttendedService = new StudentsAttendedService(
            studentsAttendedRepository
        )
        userBalanceService = new UserBalanceService(
            userBalanceRepository
        )
        attendanceService = new AttendancesService(
            attendancesRepository,
            attendancesMainTasksRepository,
            attendancesAdditionalTasksRepository,
            attendancePresetRepository,
            settingsRepository,
            studentsAttendedRepository,
            studentBalanceRepository,
            studentGroupsRepository,
            userBalanceRepository
        );
    })
    test("CRUD attendance", async () => {
        // Создаем занятие
        const isCreatedAttendance = await attendanceService.createAttendance(attendancePreset);
        expect(isCreatedAttendance).toBeTruthy()

        // Проверяем что занятие создалось (базово)
        const list = await attendanceService.getAttendancesList("2026-02-27") as AttendanceView[];
        expect(list).toContainEqual(expect.objectContaining({ ...attendancePreset }));
        attendanceId = list?.find((a) => (
            a.coach.id === attendancePreset.coach.id &&
            a.learningTopic.id === attendancePreset.learningTopic.id &&
            a?.student?.id === attendancePreset?.student?.id &&
            a?.startDate === attendancePreset.startDate
        ))?.id as string
        expect(attendanceId).toBeTruthy()

        // Проверяем что занятие появилось как незакрытое
        const unclosedList = await attendanceService.getUnclosedAttendances("2026-03-01");
        expect(unclosedList).toContainEqual(expect.objectContaining({
            id: attendanceId
        }));

        // Проверяем что у студента не стоит посещение
        const studentsAttended = await studentsAttendedService.getStudentsAttendedByAttendanceId(attendanceId)
        const fullStudentAttended = {
            attendanceId: attendanceId,
            student: oldStudent,
            attended: false
        }
        expect(studentsAttended).toContainEqual(expect.objectContaining(fullStudentAttended))

        // Изменяем занятие
        const updatedAttendance: AttendanceView = {
            id: attendanceId,
            ...attendancePreset,
            homeworkDone: true,
            student: newStudent,
        }

        const newStudentsAttended: StudentsAttendedView = {
            attendanceId: attendanceId,
            student: newStudent,
            attended: false
        }
        // Здесь необходимо передавать старое значение массива Attended для корректного обновления студента
        const isUpdated = await attendanceService.updateAttendance(updatedAttendance, [
            {
                ...fullStudentAttended
            }
        ]);
        expect(isUpdated).toBeTruthy()

        // Проверяем что студент изменился
        const updatedList = await attendanceService.getUnclosedAttendances("2026-03-01");
        expect(updatedList).toContainEqual(expect.objectContaining({
            ...attendancePreset,
            student: newStudent
        }));

        // Проверяем что у студента не стоит посещение
        const updatedStudentsAttended = await studentsAttendedService.getStudentsAttendedByAttendanceId(attendanceId)
        const fullUpdatedStudentsAttended = {
            ...newStudentsAttended
        }
        expect(updatedStudentsAttended).toContainEqual(expect.objectContaining(fullUpdatedStudentsAttended))

        // Добавляем задачи к занятию
        const taskedAttendance: AttendanceView = {
            ...updatedAttendance,
            tasks: [{
                "id": "427e097e-2f77-41c6-a882-b54633c87914",
                "name": "Задача №2: Оппозиция",
                "learningTopic": {
                    "id": "fc7529f5-16c0-45fd-bd39-33c1d8fdaa00",
                    "name": "Оппозиция",
                    "level": {
                        "id": "e1ec6640-d5df-44ea-a297-82bf2c715941",
                        "name": "Базовый",
                        "description": "Самый самый тестовый основной базовый уровень для масеньких",
                        "hoursRequired": 20
                    },
                    "description": "изучаем понятие оппозиции"
                },
                "position": "8/8/3kpK2/8/8/8/8/8 b - - 0 1",
                "quality": {
                    "id": "5b0f9065-ad4f-4480-9e80-a6f3fa83fbc3",
                    "name": "EASY",
                    "label": "Легко",
                    "labelFor": "tasks",
                    "darkColor": "#a2ff30",
                    "lightColor": "#a2ff30"
                }
            }],
            additionalTasks: [
                {
                    "id": "77399dfd-caf3-40a1-ba88-5121b4f86857",
                    "name": "Задача на оттеснение",
                    "learningTopic": {
                        "id": "ec521191-85bd-4bcc-9b40-623461ff2b26",
                        "name": "Оттеснение короля",
                        "level": {
                            "id": "e1ec6640-d5df-44ea-a297-82bf2c715941",
                            "name": "Базовый",
                            "description": "Самый самый тестовый основной базовый уровень для масеньких",
                            "hoursRequired": 20
                        },
                        "description": "изучаем прием оттеснения короля от пешки"
                    },
                    "position": null,
                    "quality": {
                        "id": "5b0f9065-ad4f-4480-9e80-a6f3fa83fbc3",
                        "name": "EASY",
                        "label": "Легко",
                        "labelFor": "tasks",
                        "darkColor": "#a2ff30",
                        "lightColor": "#a2ff30"
                    }
                }
            ]
        }

        // Здесь необходимо передавать старое значение массива Attended для корректного обновления студента
        const isTaskedUpdated = await attendanceService.updateAttendance(taskedAttendance, [
            {
                ...newStudentsAttended
            }
        ]);
        expect(isTaskedUpdated).toBeTruthy()

        // Проверяем появление задач
        const taskedList = await attendanceService.getAttendancesList("2026-02-27");
        expect(taskedList).toContainEqual(expect.objectContaining({
            id: attendanceId,
            tasks: taskedAttendance.tasks,
            additionalTasks: taskedAttendance.additionalTasks
        }));

        // Фризим занятие
        const isFreeze = await attendanceService.freezeAttendance({
            ...taskedAttendance,
            isFreeze: true,
        }, [{
            ...newStudentsAttended
        }])
        expect(isFreeze).toBeTruthy()

        // Проверяем что у студента списались деньги
        const userBalance = await userBalanceService.getUserBalance(newStudent.id);
        expect(userBalance.balance).toBe(-7500)
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        const attendanceRepo = TestDataSource.getRepository(Attendance)
        const studentBalanceTransactionsRepo = TestDataSource.getRepository(StudentsBalanceTransaction)
        const userBalanceRepo = TestDataSource.getRepository(UserBalance)

        userBalanceRepo.update({
            userId: newStudent.id,
        }, { balance: -6750 }).then(() => {
            studentBalanceTransactionsRepo.delete({
                attendanceId: attendanceId,
            }).then(() => {
                attendanceRepo.delete({
                    id: attendanceId
                })
                    .then(() => {
                        TestDataSource.destroy()
                    })
                    .finally(() => {
                        done();
                    })
            })

        })
    })
})