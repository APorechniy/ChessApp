import React, { useEffect, useState } from "react"
import { BaseInput } from "../../../atoms/BaseInput/Input"

import { type Student } from "../../../store/students/types"

import { TextButton } from "../../../atoms/TextButton"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { getAllStudents } from "../../../store/students/thunk/get-all-students"
import { addNotification, handleCloseModal } from "../../../store/system"
import { BaseSelect } from "../../../atoms/BaseSelect"
import { type AttendanceTypes, type Attendance } from "../../../store/attendance/types"
import { BaseSwitch } from "../../../atoms/BaseSwitch"
import { getAttendances } from "../../../store/attendance/thunk/get-attendances"
import { DetailAttendanceModal, DetailAttendanceForm, DetailAttendanceFormTitle, InputsBlock, SelectsBlock, CloseButton, StudentsBlock, DetailAttendanceSubtitle, StudentsAttendedList, StudentsAttendedRow, StudentsAttendedName } from "./styled"
import { updateAttendance } from "../../../store/attendance/thunk/update-attendance"
import { LearningTopics } from "../../../store/learning-topics/types"
import { getLearningTopics } from "../../../store/learning-topics/thunk/get-learning-topics"
import { Loader } from "../../../atoms/Loader"
import { getFilteredTasks, getTasks } from "../../../store/tasks/thunk/get-tasks"
import { MultiSelect } from "../../../atoms/MultiSelect"
import type { Task } from "../../../store/tasks/types"
import type { Quality } from "../../../store/quality/types"
import { getQualitiesList } from "../../../store/quality/thunk/get-qualities-list"
import { updateAndFreezeAttendance } from "../../../store/attendance/thunk/update-and-freeze-attendance"
import { removeAttendance } from "../../../store/attendance/thunk/remove-attendance"
import { handleChangeIsRemovedAttendance, handleChangeIsUpdatedAttendance } from "../../../store/attendance"
import { ClearIcon } from "../../../assets/ClearIcon"
import { getCoachesList } from "../../../store/users/thunk/get-coaches-list"
import { useDateInput } from "../../../hooks/use-date-input"
import { getStudentsAttended } from "../../../store/students-attended/thunk/get-students-attended"
import { StudentsAttended } from "../../../store/students-attended/types"
import { handleClearStudentsAttended } from "../../../store/students-attended"
import { StudentsGroup } from "../../../store/students-groups/types"
import { getStudentsGroups } from "../../../store/students-groups/thunk/get-students-groups"

type Option = { text: string, value: string }

type AttendanceTypeOption = {
    text: string;
    value: AttendanceTypes
}

const ATTENDANCE_TYPES: AttendanceTypeOption[] = [
    {
        text: "Индивидуальное",
        value: "REGULAR"
    },
    {
        text: "Пробное",
        value: "TRIAL"
    },
    {
        text: "Групповое",
        value: "GROUP"
    },
]

export const MainAttendance: React.FC<{ selectedAttendance: Attendance }> = ({ selectedAttendance }) => {
    const { isUpdatedAttendance, isRemovedAttendance, selectedDate } = useAppSelector(({ attendance }) => attendance)

    const [coach, setCoach] = useState<{ id: string; firstName: string; lastName: string; }>(selectedAttendance.coach)
    const [learningTopic, setLearningTopic] = useState<LearningTopics>(selectedAttendance.learningTopic)
    const [student, setStudent] = useState<Student>(selectedAttendance.student)
    const [group, setGroup] = useState<StudentsGroup>(selectedAttendance.group)
    const [homeworkDone, setHomeworkDone] = useState(selectedAttendance.homeworkDone)
    const [startDate, setStartDate, { utcValue: startDateUtc }] = useDateInput({ initialValue: selectedAttendance.startDate });
    const [endDate, setEndDate, { utcValue: endDateUtc }] = useDateInput({ initialValue: selectedAttendance.endDate });
    const [tasks, setTasks] = useState(selectedAttendance.tasks || [])
    const [isOnline, setIsOnline] = useState(selectedAttendance.isOnline)
    const [meetLink, setMeetLink] = useState(selectedAttendance.meetLink || "")
    const [additionalTasks, setAdditionalTasks] = useState(selectedAttendance.additionalTasks || [])
    const [studentsAttendedList, setStudentsAttendedList] = useState<StudentsAttended[]>([])
    const [quality, setQuality] = useState<Quality>(selectedAttendance.quality)
    const [type, setType] = useState<AttendanceTypes>(selectedAttendance.type)

    const dispatch = useAppDispatch()

    const { studentsGroups, isLoadingStudentsGroups } = useAppSelector(({ studentsGroups }) => studentsGroups)
    const { currentUser, coachesList, isLoadingCoachesList } = useAppSelector(({ users }) => users)
    const { tasksList, isLoadingTasks, filteredTasksList, isLoadingFilteredTasks } = useAppSelector(({ tasks }) => tasks)
    const { studentsList, studentsListLoading } = useAppSelector(({ students }) => students)
    const { learningTopicsList, isLoadingLearningTopics } = useAppSelector(({ learningTopics }) => learningTopics)
    const { studentsAttended, isLoadingStudentsAttended } = useAppSelector(({ studentsAttended }) => studentsAttended)
    const { qualitiesList } = useAppSelector(({ quality }) => quality)

    useEffect(() => {
        dispatch(getStudentsAttended({
            attendanceId: selectedAttendance.id
        }))
        dispatch(getAllStudents())
        dispatch(getCoachesList())
        dispatch(getStudentsGroups())
        dispatch(getLearningTopics())
        dispatch(getTasks({}))
        dispatch(getQualitiesList({
            labelFor: 'attendance'
        }))
    }, [])

    useEffect(() => {
        if (isUpdatedAttendance === "SUCCESS") {
            dispatch(addNotification({
                title: 'Занятие отредактировано!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isUpdatedAttendance === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при редактировании занятия!',
                variant: "error",
                autoCloseTimer: 2000,
            }))
        }

        if (isRemovedAttendance === "SUCCESS") {
            dispatch(addNotification({
                title: 'Занятие удалено!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isRemovedAttendance === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при удалении занятия!',
                variant: "error",
                autoCloseTimer: 2000,
            }))
        }
    }, [isUpdatedAttendance, isRemovedAttendance, dispatch])

    useEffect(() => {
        if (isLoadingLearningTopics && learningTopic.id) {
            dispatch(getFilteredTasks({ learningTopicId: learningTopic.id }))
        }
    }, [learningTopic, isLoadingLearningTopics])

    useEffect(() => {
        if (studentsAttended) {
            setStudentsAttendedList(studentsAttended)
        }
    }, [isLoadingStudentsAttended])

    const closeModal = () => {
        dispatch(getAttendances({
            date: selectedDate,
        }))
        dispatch(handleChangeIsRemovedAttendance())
        dispatch(handleChangeIsUpdatedAttendance())
        dispatch(handleClearStudentsAttended())
        dispatch(handleCloseModal())
    }

    const handleUpdateAttendance = async () => {
        if (!coach || !student) {
            return
        }

        const attendance: Attendance = {
            id: selectedAttendance.id,
            learningTopic: learningTopic,
            student: student,
            group: group,
            coach: {
                id: coach.id,
                firstName: coach.firstName,
                lastName: coach.lastName,
            },
            homeworkDone: homeworkDone,
            isOnline: isOnline,
            meetLink: meetLink,
            isFreeze: false,
            startDate: startDateUtc,
            endDate: endDateUtc,
            quality: quality,
            type: type,
            tasks: tasks,
            additionalTasks: additionalTasks
        }

        await dispatch(updateAttendance({
            attendance: attendance,
            studentsAttended: studentsAttendedList,
        }))
    }

    const freezeAttendance = async () => {
        if (!currentUser || (!student && !group)) {
            console.error("Cannot find subject")
            return
        }

        const attendance: Attendance = {
            id: selectedAttendance.id,
            learningTopic: learningTopic,
            student: student,
            group: group,
            coach: {
                id: coach.id,
                firstName: coach.firstName,
                lastName: coach.lastName,
            },
            homeworkDone: homeworkDone,
            isOnline: isOnline,
            meetLink: meetLink,
            isFreeze: true,
            startDate: startDateUtc,
            endDate: endDateUtc,
            quality: quality,
            type: type,
            tasks: tasks,
            additionalTasks: additionalTasks
        }

        await dispatch(updateAndFreezeAttendance({
            attendance: attendance,
            studentsAttended: studentsAttendedList,
        }))
    }

    const handleChangeCoach = (option: Option) => {
        const newCoach = coachesList.find((c) => c.id === option.value)

        if (newCoach) {
            setCoach({
                id: newCoach.id,
                firstName: newCoach.userData.firstName,
                lastName: newCoach.userData.lastName,
            })
        } else {
            setCoach({
                id: coachesList[0].id,
                firstName: coachesList[0].userData.firstName,
                lastName: coachesList[0].userData.lastName,
            })
        }
    }

    const handleChangeType = (option: Option) => {
        setType(option.value as AttendanceTypes)
    }

    const handleChangeGroup = (option: Option) => {
        const newGroup = studentsGroups.find((sg) => sg.id === option.value)

        if (newGroup) {
            setGroup(newGroup)
        } else {
            setGroup(studentsGroups[0])
        }
    }

    const handleChangeStudent = (option: Option) => {
        const newStudent = studentsList.find((s) => s.id === option.value)

        if (newStudent) {
            setStudent(newStudent)
        } else {
            setStudent(studentsList[0])
        }
    }

    const handleChangeLearningTopic = (option: Option) => {
        const newLearningTopic = learningTopicsList.find((lt) => lt.id === option.value)

        if (newLearningTopic) {
            setLearningTopic(newLearningTopic)
        } else {
            setLearningTopic(learningTopicsList[0])
        }
    }

    const handleChangeQuality = (option: Option) => {
        const newQuality = qualitiesList.find((q) => q.id === option.value)

        if (newQuality) {
            setQuality(newQuality)
        } else {
            setQuality(qualitiesList[0])
        }
    }

    const handleChangeTasks = (option: Task) => {
        const newTasks = [...tasks]
        const index = newTasks.findIndex((t) => t.id === option.id)

        if (index >= 0) {
            newTasks.splice(index, 1)
        } else {
            newTasks.push(option)
        }

        setTasks(newTasks)
    }

    const handleChangeAdditionalTasks = (option: Task) => {
        const newTasks = [...additionalTasks]
        const index = newTasks.findIndex((t) => t.id === option.id)

        if (index >= 0) {
            newTasks.splice(index, 1)
        } else {
            newTasks.push(option)
        }

        setAdditionalTasks(newTasks)
    }

    const handleRemoveAttendance = async () => {
        await dispatch(removeAttendance({
            attendanceId: selectedAttendance.id
        }))
    }

    const handleChangeAttended = (attendedItem: StudentsAttended) => {
        const newAttended = [...studentsAttendedList]

        const idx = newAttended.findIndex(sa => sa.student.id === attendedItem.student.id)

        newAttended.splice(idx, 1, {
            ...attendedItem,
            attended: !attendedItem.attended
        })

        setStudentsAttendedList(newAttended)
    }

    return (
        <DetailAttendanceModal onClick={(e) => e.stopPropagation()}>
            <CloseButton>
                <ClearIcon onClick={closeModal} />
            </CloseButton>
            <DetailAttendanceFormTitle>Редактировать занятие</DetailAttendanceFormTitle>
            {(studentsListLoading === "SUCCESS" && isLoadingLearningTopics === "SUCCESS" && currentUser) ?
                <DetailAttendanceForm onSubmit={e => e.preventDefault()}>
                    <InputsBlock>
                        <BaseSelect
                            value={coach.id}
                            options={coachesList.map((coach) => ({
                                text: `${coach.userData.firstName} ${coach.userData.lastName}`,
                                value: coach.id
                            }))}
                            handleSelect={handleChangeCoach}
                            label="Тренер"
                            isDisabled={currentUser.role !== 'admin' || isLoadingCoachesList !== "SUCCESS"}
                        />
                        <BaseSelect
                            value={type || ""}
                            options={ATTENDANCE_TYPES}
                            handleSelect={handleChangeType}
                            label="Тип занятия"
                            placeholder="Выберите тип..."
                            isDisabled={selectedAttendance.isFreeze}
                        />

                        {
                            Boolean(type && (type === "REGULAR" || type === "TRIAL")) &&
                            <BaseSelect
                                value={student?.id || ""}
                                options={studentsList.map((student) => {
                                    return {
                                        text: `${student.lastName} ${student.firstName}`,
                                        value: student.id
                                    }
                                })}
                                placeholder="Выберите ученика"
                                handleSelect={handleChangeStudent}
                                label="Ученик"
                                isDisabled={selectedAttendance.isFreeze}
                                required
                            />
                        }

                        {
                            Boolean(type && type === "GROUP") &&
                            <BaseSelect
                                value={group?.id || ""}
                                options={studentsGroups.map((studentsGroup) => {
                                    return {
                                        text: studentsGroup.name,
                                        value: studentsGroup.id
                                    }
                                })}
                                placeholder="Выберите группу"
                                handleSelect={handleChangeGroup}
                                label="Группа учеников"
                                isDisabled={isLoadingStudentsGroups !== "SUCCESS" || selectedAttendance.isFreeze}
                                required
                            />
                        }
                        <BaseSelect
                            value={learningTopic?.id || ""}
                            options={learningTopicsList.map((ltopic) => {
                                return {
                                    text: ltopic.name,
                                    value: ltopic.id
                                }
                            })}
                            handleSelect={handleChangeLearningTopic}
                            label="Тема занятия"
                            placeholder="Выберите тему"
                            isDisabled={selectedAttendance.isFreeze}
                            required
                        />
                        <MultiSelect
                            value={tasks || []}
                            options={filteredTasksList}
                            handleInput={handleChangeTasks}
                            label="Задачи"
                            placeholder="Выберите задачи"
                            required
                            isDisabled={!Boolean(learningTopic && isLoadingFilteredTasks === "SUCCESS") || selectedAttendance.isFreeze}
                        />
                        <MultiSelect
                            value={additionalTasks || []}
                            options={tasksList}
                            handleInput={handleChangeAdditionalTasks}
                            label="Дополнительные задачи"
                            placeholder="Выберите задачи"
                            required
                            isDisabled={!Boolean(learningTopic && isLoadingTasks === "SUCCESS") || selectedAttendance.isFreeze}
                        />
                        {/* <BaseSelect
                            value={quality?.id || ""}
                            options={qualitiesList.map((q) => {
                                return {
                                    text: `${q.label}`,
                                    value: q.id
                                }
                            })}
                            placeholder="Прилежность ученика"
                            handleSelect={handleChangeQuality}
                            label="Прилежность"
                            required
                            isDisabled={selectedAttendance.isFreeze}
                        /> */}
                        <BaseInput
                            value={startDate}
                            handleInput={(event) => setStartDate(event.target.value)}
                            label="Начало занятия"
                            type="datetime-local"
                            required
                            isDisabled={selectedAttendance.isFreeze}
                        />
                        <BaseInput
                            value={endDate}
                            handleInput={(event) => setEndDate(event.target.value)}
                            label="Окончание занятия"
                            type="datetime-local"
                            required
                            isDisabled={selectedAttendance.isFreeze}
                        />
                    </InputsBlock>
                    <StudentsBlock>
                        <DetailAttendanceSubtitle>
                            Отметить посещение
                        </DetailAttendanceSubtitle>
                        <StudentsAttendedList>
                            {
                                isLoadingStudentsAttended === "SUCCESS" &&
                                studentsAttendedList.map((sal) => (
                                    <StudentsAttendedRow key={sal.student.id}>
                                        <StudentsAttendedName>{`${sal.student.firstName} ${sal.student.lastName}`}</StudentsAttendedName>
                                        <BaseSwitch
                                            checked={sal.attended}
                                            handleChange={() => handleChangeAttended(sal)}
                                            isDisabled={selectedAttendance.isFreeze}
                                            style={{
                                                container: {
                                                    marginLeft: "auto"
                                                }
                                            }}
                                        />
                                    </StudentsAttendedRow>
                                ))
                            }
                        </StudentsAttendedList>
                    </StudentsBlock>
                    <SelectsBlock>
                        <BaseSwitch
                            checked={isOnline}
                            handleChange={() => setIsOnline(!isOnline)}
                            label="Онлайн занятие"
                            isDisabled={selectedAttendance.isFreeze}
                        />
                        <BaseSwitch
                            checked={homeworkDone}
                            handleChange={() => setHomeworkDone(!homeworkDone)}
                            label="ДЗ сделано"
                            isDisabled={selectedAttendance.isFreeze}
                        />
                    </SelectsBlock>

                    {
                        Boolean(isOnline) &&
                        <BaseInput
                            value={meetLink}
                            handleInput={(event) => setMeetLink(event.target.value)}
                            label="Ссылка на онлайн-встречу"
                            isDisabled={selectedAttendance.isFreeze}
                        />
                    }

                    {
                        !selectedAttendance.isFreeze &&
                        <>
                            <TextButton
                                text={'Сохранить изменения'}
                                style={{ marginTop: "2rem", height: "4rem" }}
                                onClick={handleUpdateAttendance}
                            />
                            <TextButton
                                text={'Завершить занятие'}
                                style={{ marginTop: "2rem", height: "4rem" }}
                                onClick={freezeAttendance}
                            />
                        </>
                    }
                    {
                        currentUser.role === 'admin' &&
                        <TextButton
                            text={'Удалить занятие'}
                            style={{ marginTop: "3rem", height: "4rem" }}
                            onClick={handleRemoveAttendance}
                            backgroundColor="#f6aaaaff"
                        />
                    }
                </DetailAttendanceForm>
                :
                <Loader />
            }
        </DetailAttendanceModal>
    )
}