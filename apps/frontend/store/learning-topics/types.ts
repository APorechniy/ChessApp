import type { RequestStatus } from "../../types/types"
import { type Level } from "../levels/types"

export type LearningTopics = {
    id: string,
    name: string,
    description?: string,
    level: Level
}

export type LearningTopicWithoutId = Omit<LearningTopics, "id">

export type LearningTopicsState = {
    learningTopicsList: LearningTopics[],
    selectedLearningTopic: LearningTopics | null,

    isLoadingFilteredLearningTopics: RequestStatus,
    isLoadingLearningTopics: RequestStatus,
    isCreateLearningTopic: RequestStatus,
    isUpdateLearningTopic: RequestStatus,
    isRemoveLearningTopic: RequestStatus,
}