import {
    AttendanceAdditionalTasksRepository,
    AttendancePresetRepository,
    AttendancesRepository,
    SettingsRepository,
    StudentsAttendedRepository,
    StudentsBalanceTransactionRepository,
    StudentsGroupsRepository,
    UserBalanceRepository
} from "../../src/repositories";
import { AttendancesService } from "../../src/services";
import { AttendanceMainTasksRepository } from "../../src/repositories/AttendanceMainTasksRepository";
import attendanceListEmpty from "../mock/attendance-list-empty.json";
import attendancesList28042025 from '../mock/attendance-list-28042025.json';
import { TestDataSource } from "../../src/config/test-ormconfig";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import { AttendanceView } from "@/entities";

describe("Attendances Service", () => {
    let attendancesService: AttendancesService
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const attendancesRepository = new AttendancesRepository(dataSource);
        const attendanceMainTasksRepository = new AttendanceMainTasksRepository(dataSource);
        const attendanceAdditionalTasksRepository = new AttendanceAdditionalTasksRepository(dataSource);
        const attendancePresetsRepository = new AttendancePresetRepository(dataSource);
        const settingsRepository = new SettingsRepository(dataSource);
        const studentsGroupsRepository = new StudentsGroupsRepository(dataSource);
        const studentsAttendedRepository = new StudentsAttendedRepository(dataSource);
        const studentsBalanceTransactionRepository = new StudentsBalanceTransactionRepository(dataSource);
        const userBalanceRepository = new UserBalanceRepository(dataSource);
        attendancesService = new AttendancesService(
            attendancesRepository,
            attendanceMainTasksRepository,
            attendanceAdditionalTasksRepository,
            attendancePresetsRepository,
            settingsRepository,
            studentsAttendedRepository,
            studentsBalanceTransactionRepository,
            studentsGroupsRepository,
            userBalanceRepository,
        );
    })

    test("Get attendances list by 28.04.2025", async () => {
        const date = "2025-04-28"
        const mockedAttendancesList = EntityMockHelper.asEntityArray(AttendanceView, attendancesList28042025 as AttendanceView[]);
        const attendancesList = await attendancesService.getAttendancesList(date)

        expect(attendancesList).toStrictEqual(mockedAttendancesList);
    })


    test("Get empty attendances list by 27.04.2025", async () => {
        const date = "2025-04-27"
        const attendancesList = await attendancesService.getAttendancesList(date)

        expect(attendancesList).toStrictEqual(attendanceListEmpty);
    })

    test("Reject without date", async () => {
        await expect(attendancesService.getAttendancesList.bind(attendancesService)).rejects.toThrow();
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy()
        done()
    })
})