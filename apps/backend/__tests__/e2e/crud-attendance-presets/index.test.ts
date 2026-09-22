import { AttendancePresetRepository, AttendancesRepository } from "../../../src/repositories";
import { EntityMockHelper } from "../../helpers/entity-mock-helper";
import { TestDataSource } from "../../../src/config/test-ormconfig";
import attendancePresets from '../../mock/attendance-presets.json'
import { AttendancePreset, AttendancePresetView } from "@/entities";
import { AttendancePresetService } from "@/services";

describe("Attendance Presets Service", () => {
    let attendancePresetId: string = ""
    const attendancePresetPreset = {
        "endDate": "2026-05-29T10:00:00Z",
        "endTimeLocal": "20:00",
        "excludedDates": [],
        "group": null,
        "rrule": "DTSTART=20260401;FREQ=WEEKLY;BYDAY=MO,WE",
        "startTimeLocal": "19:00",
        "student": {
            "firstName": "Студент",
            "id": "bd40d71a-dbd2-4f43-873f-e6d767d722f3",
            "lastName": "Студент"
        },
        "timezone": "Asia/Yekaterinburg",
        "type": "REGULAR"
    }
    const newRrule = "DTSTART=20260401;FREQ=WEEKLY;BYDAY=MO,WE,FR"
    const newDate = "2026-05-27"

    let attendancePresetService: AttendancePresetService;
    beforeAll(async () => {
        const dataSource = TestDataSource;
        await TestDataSource.initialize();

        const attendancePresetRepository = new AttendancePresetRepository(dataSource);
        const attendancesRepository = new AttendancesRepository(dataSource);
        attendancePresetService = new AttendancePresetService(
            attendancePresetRepository,
            attendancesRepository
        );
    })

    test("CRUD", async () => {
        // Наличие неизмененного списка
        const mockedAttendancePresetsList = EntityMockHelper.asEntityArray(AttendancePresetView, attendancePresets as AttendancePresetView[]);
        const attendancePresetsList = await attendancePresetService.getAttendancePresetsList()

        expect(attendancePresetsList).toStrictEqual(mockedAttendancePresetsList);

        // Создаем новый шаблон
        const isCreated = await attendancePresetService.createAttendancePreset(attendancePresetPreset as Omit<AttendancePresetView, "id">)

        expect(isCreated).toBeTruthy()

        // Ищем и сохраняем его ID
        const updatedAttendancePresetsList = await attendancePresetService.getAttendancePresetsList()
        const createdAttendancePreset = updatedAttendancePresetsList?.find((ap) => Boolean(
            ap.rrule === attendancePresetPreset.rrule &&
            ap.startTimeLocal === attendancePresetPreset.startTimeLocal &&
            ap.endTimeLocal === attendancePresetPreset.endTimeLocal
        ))

        expect(createdAttendancePreset).toBeTruthy()

        attendancePresetId = createdAttendancePreset?.id as string;

        // Изменяем пресет
        const updatedPreset = {
            ...createdAttendancePreset,
            rrule: newRrule
        }

        const isUpdated = await attendancePresetService.updateAttendancePreset(updatedPreset as AttendancePresetView);
        expect(isUpdated).toBeTruthy()

        // Добавляем дату в исключения
        const isAdded = await attendancePresetService.addExcludedDate(updatedPreset.id as string, newDate)
        expect(isAdded).toBeTruthy()

        // Проверяем на соответствие
        const newAttendancePresetsList = await attendancePresetService.getAttendancePresetsList()
        expect(newAttendancePresetsList).not.toStrictEqual(mockedAttendancePresetsList);

        const newUpdatedPreset = newAttendancePresetsList?.find(ap => ap.id === attendancePresetId)
        const ethalon = EntityMockHelper.asEntity(AttendancePresetView, {
            ...attendancePresetPreset,
            id: attendancePresetId,
            rrule: newRrule,
            excludedDates: [newDate]
        } as AttendancePresetView);
        expect(newUpdatedPreset).toStrictEqual(ethalon)

        // Удаляем шаблон
        const isDeleted = await attendancePresetService.deleteAttendancePreset(attendancePresetId)
        expect(isDeleted).toBeTruthy()

        // Проверяем, что все вернулось
        const finalAttendancePresetsList = await attendancePresetService.getAttendancePresetsList()

        expect(finalAttendancePresetsList).toStrictEqual(mockedAttendancePresetsList);
    })

    // Если не добавить, Jest не закроется автоматически, т.к. пул будет висеть
    afterAll(done => {
        const attendanceRepo = TestDataSource.getRepository(AttendancePreset)

        attendanceRepo.delete({
            id: attendancePresetId,
        }).then(() => {
            TestDataSource.destroy()
        })
            .finally(() => {
                done();
            })
    })
})