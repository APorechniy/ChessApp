import { AttendancePresetRepository } from "../../src/repositories";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import { TestDataSource } from "../../src/config/test-ormconfig";
import attendancePresets from '../mock/attendance-presets.json'
import attendancePresetsByDate from '../mock/attendance-presets-by-date.json'
import { AttendancePresetView } from "@/entities";

describe("Attendance Presets Repository", () => {
    let attendancePresetRepository: AttendancePresetRepository;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        attendancePresetRepository = new AttendancePresetRepository(dataSource);
    })

    test("Get all presets list", async () => {
        const mockedAttendancePresetsList = EntityMockHelper.asEntityArray(AttendancePresetView, attendancePresets as AttendancePresetView[]);
        const attendancePresetsList = await attendancePresetRepository.getAttendancePresetsList()

        expect(attendancePresetsList).toStrictEqual(mockedAttendancePresetsList);
    })

    test("Get presets list by date", async () => {
        const date = "2026-04-16"
        const mockedAttendancePresetsList = EntityMockHelper.asEntityArray(AttendancePresetView, attendancePresetsByDate as AttendancePresetView[]);
        const attendancePresetsList = await attendancePresetRepository.getAttendancePresetsByDate(date)

        expect(attendancePresetsList).toStrictEqual(mockedAttendancePresetsList);
    })

    test("Get empty list if date in excluded", async () => {
        const date = "2026-04-14"
        const attendancePresetsList = await attendancePresetRepository.getAttendancePresetsByDate(date)

        expect(attendancePresetsList).toStrictEqual([]);
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy();
        done()
    })
})