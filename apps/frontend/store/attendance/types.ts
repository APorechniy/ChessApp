import type { RequestStatus } from "../../types/types";
import { type LearningTopics } from "../learning-topics/types";
import { type Quality } from "../quality/types";
import { type StudentsGroup } from "../students-groups/types";
import { type Student } from "../students/types";
import { type Task } from "../tasks/types";
import { type CoachUser } from "../users/types";

export type AttendanceTypes = "REGULAR" | "TRIAL" | "GROUP"

export type Attendance = {
    id: string,
    learningTopic: LearningTopics,
    student?: Student,
    group?: StudentsGroup,
    coach: {
        id: CoachUser["id"],
        firstName: CoachUser["userData"]["firstName"],
        lastName: CoachUser["userData"]["lastName"],
    },
    presetId?: string,
    tasks?: Task[],
    additionalTasks?: Task[],
    homeworkDone?: boolean,
    isOnline?: boolean,
    meetLink?: string,
    isFreeze?: boolean,
    type: AttendanceTypes,
    startDate: string,
    endDate: string,
    quality?: Quality,
}

export type AttendanceWithoutId = Omit<Attendance, "id">

type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type PartialAttendance = MakeOptional<
    Attendance,
    'learningTopic' | 'coach' | 'homeworkDone' | 'isOnline' | 'meetLink' | 'isFreeze' | 'tasks' | 'additionalTasks'
> & { isPreset: boolean }

export type AttendanceState = {
    attendancesList: (Attendance | PartialAttendance)[],
    unclosedAttendancesList: Attendance[],
    studentAttendancesList: Attendance[],
    selectedAttendance: (Attendance | PartialAttendance) | null,
    selectedDate: string | null,

    nextAttendance: Attendance | null,

    isCreatedAttendance: RequestStatus,
    isUpdatedAttendance: RequestStatus,
    isRemovedAttendance: RequestStatus,

    attendancesListLoading: RequestStatus,
    unclosedAttendancesLoading: RequestStatus,
    studentAttendancesListLoading: RequestStatus,

    isLoadingNextAttendance: RequestStatus,
}