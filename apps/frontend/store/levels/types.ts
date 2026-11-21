export type Level = {
    id: string,
    name: string,
    hoursRequired: number,
    description?: string,
}

export type LevelsState = {
    levelsList: Level[],
}