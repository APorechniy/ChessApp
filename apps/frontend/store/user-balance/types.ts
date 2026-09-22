import type { RequestStatus } from "../../types/types"

export type UserBalanceState = {
    balance: number,

    isLoadingBalance: RequestStatus,
}