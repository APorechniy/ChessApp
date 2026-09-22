import React, { useState } from 'react'

import { TIMES } from '../../../content/calendar'
import { getCoords } from "../../../utils/get-coords"
import { useAttendances } from '../../../hooks/use-attendances'
import { useAppSelector, useAppDispatch } from '../../../store/store'
import { handleChangeIsUpdatedAttendance, handleChangeIsRemovedAttendance, handleChangeSelectedAttendance } from '../../../store/attendance'
import { type PartialAttendance, type Attendance } from '../../../store/attendance/types'
import { handleOpenModal } from '../../../store/system'
import { Calendar, TimeWrapper, AttendanceCard, CoachName, Row, StudentName, Time } from './styled'

export const CalendarBoard = () => {
    const [isLoading, setIsLoading] = useState(false)

    const { attendancesListLoading } = useAppSelector(({ attendance }) => attendance)
    const { currentUser } = useAppSelector(({ users }) => users)

    const attendanceTree = useAttendances();

    const dispatch = useAppDispatch()

    const handleOpenDetailAttendance = async (attendance: Attendance | PartialAttendance) => {
        await dispatch(handleChangeIsUpdatedAttendance())
        await dispatch(handleChangeIsRemovedAttendance())
        await dispatch(handleChangeSelectedAttendance({
            selectedAttendance: attendance
        }))
        dispatch(handleOpenModal({
            modalContent: "DETAIL_ATTENDANCE"
        }))
    }

    const getCardColors = (attendance: Attendance | PartialAttendance) => {
        if (currentUser.role === "admin") {
            if ('isPreset' in attendance && attendance.isPreset) {
                return {
                    cardColor: "#e8fdff",
                    borderColor: "#21bdca"
                }
            } else if (attendance.type === "TRIAL") {
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
        } else {
            if (attendance.student.id === currentUser.id) {
                return {
                    cardColor: "#e8fdff",
                    borderColor: "#21bdca"
                }
            } else {
                return {
                    cardColor: "#eaeeff",
                    borderColor: "#5372e7"
                }
            }
        }
    }

    return (
        <Calendar>
            <TimeWrapper>
                {
                    TIMES.map((t, index) => {
                        const isLast = TIMES.length === index + 1

                        return (
                            <Row key={`TIME_${t}`}>
                                <Time>
                                    {!isLast && `${t}:00`}
                                </Time>
                            </Row>
                        )
                    })
                }

                {(attendancesListLoading === "SUCCESS" && !isLoading) &&
                    attendanceTree.map((attendanceColumn, index) => {
                        return attendanceColumn.map((attendance) => {
                            const { top, height } = getCoords(attendance.startDate, attendance.endDate)
                            const { cardColor, borderColor } = getCardColors(attendance)
                            const coachName = attendance.coach ? `${attendance?.coach?.firstName} ${attendance.coach.lastName}` : "Тренер не выбран"

                            return (
                                <AttendanceCard
                                    key={attendance.id}
                                    $cardColor={cardColor}
                                    $borderColor={borderColor}
                                    style={{
                                        top: `${top}rem`,
                                        height: `${height}rem`,
                                        left: `${21 * (index) + 7}rem`
                                    }}
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
                                    <CoachName>{coachName}</CoachName>
                                </AttendanceCard>
                            )
                        }
                        )
                    })
                }
            </TimeWrapper>
        </Calendar>
    )
}