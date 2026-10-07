import type { RequestStatus } from "../../types/types"
import { Task } from "../tasks/types"

export type Homework = {
    id: string,
    name?: string,
    attendanceId: string,
    expiresAt: string,
    tasks: Task[]
}

export type HomeworkWithoutId = Omit<Homework, "id">

export type HomeworksState = {
    currentHomework: Homework | null,

    isLoadingHomework: RequestStatus,
    isCreatedHomework: RequestStatus,
    isFreezedHomework: RequestStatus,
    isUpdatedHomework: RequestStatus,
    isDeletedHomework: RequestStatus,
}