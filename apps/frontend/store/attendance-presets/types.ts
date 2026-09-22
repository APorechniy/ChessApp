import type { RequestStatus } from "../../types/types";
import { type AttendanceTypes } from "../attendance/types";
import { type StudentsGroup } from "../students-groups/types";
import { type Student } from "../students/types";

export type AttendancePreset = {
    id: string,
    student?: Student,
    group?: StudentsGroup,
    type: AttendanceTypes,
    rrule: string,
    startTimeLocal: string,
    endTimeLocal: string,
    endDate: string,
    excludedDates?: string[],
    timezone: string,
}

export type AttendancePresetWithoutId = Omit<AttendancePreset, "id">

export type AttendancePresetsState = {
    attendancePresetsList: AttendancePreset[],

    currentAttendancePreset: AttendancePreset | null,

    attendancePresetsListLoading: RequestStatus,
    isCreatedAttendancePreset: RequestStatus,
    isUpdatedAttendancePreset: RequestStatus,
    isDeletedAttendancePreset: RequestStatus,
    isExcludedDate: RequestStatus,
}