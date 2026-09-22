import { useAppSelector } from "../store/store"

export const useUserRole = () => {
    const { currentUser } = useAppSelector(({ users }) => users)

    return currentUser.role
}