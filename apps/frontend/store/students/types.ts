import type { Level } from "../levels/types";
import type { RequestStatus } from "../../types/types";

export type StudentStatistic = {
    id: string,
    lessons: {
        total: number;
        visited: number;
    },
    topics: {
        total: number;
        learned: number;
    },
    tasksSolvedCount: number,
    activeDaysLastMonth: number[],
}

export type Student = {
    id: string,
    firstName: string,
    lastName: string,
    birthDate?: string,
    level: Level,
    fshrId?: number;
    fideId?: number;
    phone?: string,
    email?: string,
    joinDate?: string,
    notes?: string,
    paidLessons?: number,
    isExcluded: boolean,
    balance?: number,
}

export type StudentsState = {
    studentsList: Student[],
    selectedStudent: Student | null,

    studentStatistic: StudentStatistic | null,

    isCreatedStudent: RequestStatus,
    isUpdatedStudent: RequestStatus,
    isRemoveStudent: RequestStatus,

    isLoadingStudentStatistic: RequestStatus,
    studentsListLoading: RequestStatus
}