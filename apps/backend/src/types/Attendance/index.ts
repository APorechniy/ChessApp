import { type AttendanceView } from "@/entities"

type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type PartialAttendance = MakeOptional<
    AttendanceView,
    'learningTopic' | 'coach' | 'homeworkDone' | 'isOnline' | 'meetLink' | 'isFreeze' | 'isDeleted' | 'tasks' | 'additionalTasks'
> & { isPreset: boolean }