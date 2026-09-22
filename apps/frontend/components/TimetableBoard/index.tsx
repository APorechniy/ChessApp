import React, { useEffect } from "react"
import { Board } from "./styled"
import { DatePicker } from "./DatePicker"
import { TimetableHeader } from "./TimetableHeader"
import { CalendarBoard } from "./CalendarBoard"
import { usePlatform } from "../../hooks/use-platform"
import { useAppDispatch } from "../../store/store"
import { handleChangeDaysOffset } from "../../store/system"
import { useUserRole } from "../../hooks/use-user-role"
import { CalendarList } from "./CalendarList"

export const TimetableBoard = () => {
    const platform = usePlatform()
    const userRole = useUserRole()

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (platform === "mobile") {
            dispatch(handleChangeDaysOffset({ daysOffset: 2 }))
        } else {
            dispatch(handleChangeDaysOffset({ daysOffset: 3 }))
        }
    }, [platform])

    const CalendarComponent = userRole === "student" ? CalendarList : CalendarBoard

    return (
        <Board>
            <TimetableHeader />
            <DatePicker />
            <CalendarComponent />
        </Board>
    )
}