import type { RequestStatus } from "../../types/types"

export type Report = {
    reportFile: Blob,
    reportFileName: string,
}

export type ReportsState = {
    currentReport: Report | null,
    isLoadingReport: RequestStatus
}