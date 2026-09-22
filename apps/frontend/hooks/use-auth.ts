import { useMemo } from "react";
import { signIn } from "../store/auth/thunk/sing-in";
import { useAppDispatch, useAppSelector } from "../store/store"

type HandleSignInProps = {
    username: string,
    password: string
}

type HandleSignIn = ({
    username, password,
}: HandleSignInProps) => void

export const useAuth = () => {
    const { isAuth, authLoading, isRefreshingToken } = useAppSelector(({ auth }) => auth);

    const isLoading = isRefreshingToken || authLoading === "PENDING"

    const dispatch = useAppDispatch()

    const handleSignIn: HandleSignIn = ({ username, password }) => {
        dispatch(signIn({
            username: username,
            password: password
        }))
    }

    return {
        handleSignIn,
        authLoadingStatus: authLoading,
        isAuth,
        isLoading,
    }
}