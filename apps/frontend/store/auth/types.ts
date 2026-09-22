import type { RequestStatus } from "../../types/types"

export type Tokens = {
    jwtToken: string,
    updateToken: string,
}

export type User = {
    username: string,
    id: string,
    role: "admin" | "coach" | "student" | "parent"
}

export type AuthState = {
    isAuth: boolean,

    authLoading: RequestStatus,
    isRefreshingToken: boolean,
}