import type { RequestStatus } from "../../types/types"

export type Quality = {
    id: string,
    name: string,
    label: string,
    labelFor: string,
    lightColor: string,
    darkColor: string,
}

export type QualitiesState = {
    qualitiesList: Quality[],

    isLoadingQualitities: RequestStatus
}