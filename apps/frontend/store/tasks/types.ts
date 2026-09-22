import type { RequestStatus } from "../../types/types"
import type { LearningTopics } from "../learning-topics/types"
import type { Quality } from "../quality/types"

export type Task = {
    id: string,
    name: string,
    learningTopic: LearningTopics,
    quality: Quality,
    position?: any
}

export type TaskWithoutId = Omit<Task, "id">

export type TasksState = {
    tasksList: Task[],
    filteredTasksList: Task[],
    selectedTask: Task | null,

    editableTask: Task | null,

    isLoadingTasks: RequestStatus,
    isLoadingFilteredTasks: RequestStatus,
    isCreatedTask: RequestStatus,
    isUpdatedTask: RequestStatus,
    isRemovedTask: RequestStatus,

    isLoadingEditableTask: RequestStatus
}