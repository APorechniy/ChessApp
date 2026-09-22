import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Title, Wrapper, AttendanceCard, StudentName, CoachName, DateItem, EmptyList } from './styled'
import { Loader } from '../../atoms/Loader'
import { getUnclosedAttendances } from '../../store/attendance/thunk/get-unclosed-attendances'
import { type Attendance } from '../../store/attendance/types'
import { handleChangeIsRemovedAttendance, handleChangeIsUpdatedAttendance, handleChangeSelectedAttendance } from '../../store/attendance'
import { handleOpenModal } from '../../store/system'
import { getHumanityDate } from '../../utils/get-humanity-date'

export const UnclosedAttendancesWidget = () => {
    const { currentUser } = useAppSelector(({ users }) => users)
    const { unclosedAttendancesList, unclosedAttendancesLoading } = useAppSelector(({ attendance }) => attendance)
    const { isOpenModal } = useAppSelector(({ system }) => system)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isOpenModal) {
            handleGetUnclosedAttendances()
        }
    }, [isOpenModal])

    const handleOpenDetailAttendance = async (attendance: Attendance) => {
        await dispatch(handleChangeIsUpdatedAttendance())
        await dispatch(handleChangeIsRemovedAttendance())
        await dispatch(handleChangeSelectedAttendance({
            selectedAttendance: attendance
        }))
        dispatch(handleOpenModal({
            modalContent: "DETAIL_ATTENDANCE"
        }))
    }

    const handleGetUnclosedAttendances = () => {
        if (currentUser?.role === "admin") {
            dispatch(getUnclosedAttendances({}))
        }

        if (currentUser?.role === "coach") {
            dispatch(getUnclosedAttendances({
                coachId: currentUser.id
            }))
        }
    }

    const getCardsColor = (attendance: Attendance) => {
        if (attendance.type === "TRIAL") {
            return {
                cardColor: "#fff6eb",
                borderColor: "#ff9f24",
            }
        } else if (attendance.type === "GROUP") {
            return {
                cardColor: "#ffeaea",
                borderColor: "#e75353"
            }
        } else {
            return {
                cardColor: "#eaeeff",
                borderColor: "#5372e7"
            }
        }
    }

    return (
        <Wrapper>
            <Title>Незавершённые занятия</Title>
            {
                (unclosedAttendancesLoading === "IDLE" || unclosedAttendancesLoading === "PENDING")
                    ?
                    <Loader />
                    :
                    unclosedAttendancesList.length > 0
                        ?
                        unclosedAttendancesList.map((attendance) => {
                            const { cardColor, borderColor } = getCardsColor(attendance)
                            return (
                                <AttendanceCard
                                    key={attendance.id}
                                    $cardColor={cardColor}
                                    $borderColor={borderColor}
                                    onClick={() => handleOpenDetailAttendance(attendance)}
                                >
                                    <StudentName>
                                        {
                                            attendance.type === "GROUP"
                                                ?
                                                attendance.group.name
                                                :
                                                `${attendance.student.lastName} ${attendance.student.firstName[0]}.`
                                        }
                                    </StudentName>
                                    <CoachName>{`${attendance.coach.firstName} ${attendance.coach.lastName}`}</CoachName>
                                    <DateItem>{`${getHumanityDate(attendance.startDate)}`}</DateItem>
                                </AttendanceCard>
                            )
                        }
                        )
                        :
                        <EmptyList>
                            У вас нет незавершенных занятий
                        </EmptyList>
            }
        </Wrapper>
    )
}