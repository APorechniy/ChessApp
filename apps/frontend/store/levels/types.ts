import type { RequestStatus } from "../../types/types"

export type Level = {
    id: string,
    name: string,
    hoursRequired: number,
    description?: string,
}

export type LevelsState = {
    levelsList: Level[],

    isLoadingLevels: RequestStatus
}