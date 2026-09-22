import { AttendancePresetRepository, AttendancesRepository } from "../../src/repositories";
import { EntityMockHelper } from "../helpers/entity-mock-helper";
import { TestDataSource } from "../../src/config/test-ormconfig";
import attendancePresets from '../mock/attendance-presets.json'
import { AttendancePresetView } from "@/entities";
import { AttendancePresetService } from "@/services";

describe("Attendance Presets Service", () => {
    let attendancePresetService: AttendancePresetService;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const attendancePresetRepository = new AttendancePresetRepository(dataSource);
        const attendanceRepository = new AttendancesRepository(dataSource);
        attendancePresetService = new AttendancePresetService(
            attendancePresetRepository,
            attendanceRepository,
        );
    })

    test("Get all presets list", async () => {
        const mockedAttendancePresetsList = EntityMockHelper.asEntityArray(AttendancePresetView, attendancePresets as AttendancePresetView[]);
        const attendancePresetsList = await attendancePresetService.getAttendancePresetsList()

        expect(attendancePresetsList).toStrictEqual(mockedAttendancePresetsList);
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        TestDataSource.destroy();
        done()
    })
})