import { AppDispatch, clearStore } from "../store/store"

export const handleExit = (dispatch: AppDispatch) => {
    dispatch(clearStore())
    window.location.replace('/sign-in')
}