import { AttendancesRepository } from "../../src/repositories";
import attendancesList28042025 from "../mock/attendance-list-28042025.json";
import attendanceListEmpty from "../mock/attendance-list-empty.json";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import { TestDataSource } from "../../src/config/test-ormconfig";
import { AttendanceView } from "../../src/entities/attendance-view.entity";

describe("Attendances Repository", () => {
    let attendancesRepository: AttendancesRepository;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        attendancesRepository = new AttendancesRepository(dataSource);
    })

    test("Get attendances list by 28.04.2025", async () => {
        const date = "2025-04-28"
        const mockedAttendancesList = EntityMockHelper.asEntityArray(AttendanceView, attendancesList28042025 as AttendanceView[]);
        const attendancesList = await attendancesRepository.getAttendancesList(date)

        expect(attendancesList).toStrictEqual(mockedAttendancesList);
    })

    test("Get empty attendances list by 27.04.2025", async () => {
        const date = "2025-04-27"
        const attendancesList = await attendancesRepository.getAttendancesList(date)

        expect(attendancesList).toStrictEqual(attendanceListEmpty);
    })

    test("Reject without date", async () => {
        await expect(attendancesRepository.getAttendancesList.bind(attendancesRepository)).rejects.toThrow();
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy();
        done()
    })
})