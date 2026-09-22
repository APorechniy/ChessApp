import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { AttendanceCard, Calendar, CoachName, EmptyAttendances, EndDate, Icon, LearningTopicName, NotificationWrapper, OnlineLink, StartDate } from "./styled"
import { getAttendancesForStudent } from "../../../store/attendance/thunk/get-attendances-for-student"
import { Loader } from "../../../atoms/Loader"
import { Warning } from "../../../assets/Warning"
import { getHourse } from "../../../utils/get-hourse"

export const CalendarList = () => {
    const { selectedDate, studentAttendancesList, studentAttendancesListLoading } = useAppSelector(({ attendance }) => attendance)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAttendancesForStudent({
            date: new Date(selectedDate),
        }))
    }, [selectedDate])

    return (
        <Calendar>
            {
                studentAttendancesListLoading === "SUCCESS"
                    ?
                    (
                        studentAttendancesList.length ?
                            studentAttendancesList.map((a) => {
                                return (
                                    <AttendanceCard
                                        key={a.id}
                                        $cardColor={"#eaeeff"}
                                        $borderColor={"#5372e7"}
                                    >
                                        <CoachName>
                                            {`Тренер: ${a.coach.firstName} ${a.coach.lastName}`}
                                        </CoachName>
                                        <LearningTopicName>
                                            {`Тема занятия: ${a.learningTopic.name}`}
                                        </LearningTopicName>
                                        {
                                            Boolean(a.isOnline && a.meetLink) &&
                                            <NotificationWrapper>
                                                <Icon>
                                                    <Warning color="var(--primary-btn-color)" />
                                                </Icon>
                                                <OnlineLink href={a.meetLink} target="_blank">
                                                    Занятие проводится онлайн
                                                </OnlineLink>
                                            </NotificationWrapper>
                                        }
                                        <StartDate>
                                            {`Начало занятия: ${getHourse(a.startDate)}`}
                                        </StartDate>
                                        <EndDate>
                                            {`Окончание занятия: ${getHourse(a.endDate)}`}
                                        </EndDate>
                                    </AttendanceCard>
                                )
                            })
                            :
                            <EmptyAttendances>
                                У вас нет занятий в этот день
                            </EmptyAttendances>
                    )
                    :
                    <Loader />
            }
        </Calendar>
    )
}