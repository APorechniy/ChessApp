import { type AttendancePreset, type AttendancePresetView } from "@/entities";
import {
    type AttendancesRepository,
    type AttendancePresetRepository,
} from "@/repositories";
import { v4 as uuidv4 } from 'uuid'
// TODO проблема с ESM
// import { RRule } from "rrule";

export class AttendancePresetService {
    constructor(
        private attendancePresetRepository: AttendancePresetRepository,
        private attendanceRepository: AttendancesRepository
    ) { }

    async getAttendancePresetsList(): Promise<AttendancePresetView[] | null> {
        try {
            const attendancePresetsList =
                await this.attendancePresetRepository.getAttendancePresetsList();

            return attendancePresetsList;
        } catch (error) {
            throw error;
        }
    }

    async createAttendancePreset(
        attendancePreset: Omit<AttendancePresetView, "id">,
    ): Promise<boolean> {
        const fullAttendancePreset: AttendancePreset = {
            id: uuidv4(),
            studentId: attendancePreset.student?.id,
            studentsGroupId: attendancePreset.group?.id,
            type: attendancePreset.type,
            rrule: attendancePreset.rrule,
            startTimeLocal: attendancePreset.startTimeLocal,
            timezone: attendancePreset.timezone,
            endTimeLocal: attendancePreset.endTimeLocal,
            excludedDates: [],
            endDate: attendancePreset.endDate
        };

        // try {
        //     new RRule(RRule.parseString(attendancePreset.rrule));
        // } catch (error) {
        //     throw new Error('Invalid RRule format');
        // }

        const isCreatedAttendancePreset =
            await this.attendancePresetRepository.createAttendancePreset(fullAttendancePreset);

        return isCreatedAttendancePreset;
    }

    async addExcludedDate(attendancePresetId: string, excludedDate: string) {
        const isUpdated = await this.attendancePresetRepository.addExcludedDate(
            attendancePresetId,
            excludedDate,
        )

        return isUpdated
    }

    async updateAttendancePreset(
        attendancePreset: AttendancePresetView,
    ): Promise<boolean> {
        const fullAttendancePreset: AttendancePreset = {
            id: attendancePreset.id,
            studentId: attendancePreset?.student?.id,
            studentsGroupId: attendancePreset?.group?.id,
            type: attendancePreset.type,
            rrule: attendancePreset.rrule,
            startTimeLocal: attendancePreset.startTimeLocal,
            timezone: attendancePreset.timezone,
            endTimeLocal: attendancePreset.endTimeLocal,
            excludedDates: attendancePreset.excludedDates,
            endDate: attendancePreset.endDate
        }
        return Boolean(await this.attendancePresetRepository.updateAttendancePreset(fullAttendancePreset));
    }

    async deleteAttendancePreset(
        attendancePresetId: string,
    ): Promise<boolean> {
        const isChangedAttendances = await this.attendanceRepository.removePresetIdFromAttendances(attendancePresetId);

        return (
            isChangedAttendances
            &&
            Boolean(await this.attendancePresetRepository.removeAttendancePreset(attendancePresetId))
        )
    }
}
