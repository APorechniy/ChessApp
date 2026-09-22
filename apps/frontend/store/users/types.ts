import type { RequestStatus } from "../../types/types"
import { Student } from "../students/types";

export type UserRole = 'admin' | 'coach' | 'student' | 'parent'

export type CoachData = {
    id: string;
    firstName: string;
    lastName: string;
    birthDate?: string;
    avatar?: string;
    biography?: string;
    fshrId?: number;
    fideId?: number;
    phone?: string;
    email?: string;
    joinDate?: string;
    isFired: boolean;
}

export type UserBase = {
    id: string,
    username: string,
}

export type CoachUser = UserBase & {
    role: "coach",
    userData: CoachData
}
export type StudentUser = UserBase & {
    role: "student",
    userData: Student
}
export type AdminUser = UserBase & {
    role: "admin",
    userData: null
}

export type User = CoachUser | StudentUser | AdminUser

export type UsersState = {
    currentUser: User | null,

    editableCoach: CoachUser | null,

    coachesList: CoachUser[] | null,

    isLoadingUser: RequestStatus,
    isLoadingCoachesList: RequestStatus,
    isUpdatedCoachData: RequestStatus,
    isUpdatedStudentData: RequestStatus,
    isRemovedCoach: RequestStatus,
    isCreatedCoach: RequestStatus,

    updateErrorMessage: string | null,
}