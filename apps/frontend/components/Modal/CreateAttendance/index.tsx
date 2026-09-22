import React, { useEffect, useState } from "react"
import { BaseInput } from "../../../atoms/BaseInput/Input"

import { type Student } from "../../../store/students/types"

import { TextButton } from "../../../atoms/TextButton"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { getAllStudents } from "../../../store/students/thunk/get-all-students"
import { addNotification, handleCloseModal } from "../../../store/system"
import { BaseSelect } from "../../../atoms/BaseSelect"
import { type AttendanceTypes, type AttendanceWithoutId } from "../../../store/attendance/types"
import { createAttendance } from "../../../store/attendance/thunk/create-attendance"
import { BaseSwitch } from "../../../atoms/BaseSwitch"
import { getAttendances } from "../../../store/attendance/thunk/get-attendances"
import { CreateAttendanceFormTitle, CreateAttendanceModal, CreateAttendanceForm, InputsBlock, SwitchesBlock, CloseButton } from "./styled"
import { type LearningTopics } from "../../../store/learning-topics/types"
import { getFilteredLearningTopics, getLearningTopics } from "../../../store/learning-topics/thunk/get-learning-topics"
import { Loader } from "../../../atoms/Loader"
import { Task } from "../../../store/tasks/types"
import { getFilteredTasks, getTasks } from "../../../store/tasks/thunk/get-tasks"
import { handleClearFilteredTasksList } from "../../../store/tasks"
import { MultiSelect } from "../../../atoms/MultiSelect"
import type { Quality } from "../../../store/quality/types"
import { getQualitiesList } from "../../../store/quality/thunk/get-qualities-list"
import { handleClearGetFilteredLearningTopic, handleClearLearningTopicsList } from "../../../store/learning-topics"
import { handleChangeIsCreatedAttendance } from "../../../store/attendance"
import { ClearIcon } from "../../../assets/ClearIcon"
import { getCoachesList } from "../../../store/users/thunk/get-coaches-list"
import { type CoachUser } from "../../../store/users/types"
import { useDateInput } from "../../../hooks/use-date-input"
import { type StudentsGroup } from "../../../store/students-groups/types"
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

export const CreateAttendance = () => {
    const dispatch = useAppDispatch()

    const { isCreatedAttendance, selectedDate } = useAppSelector(({ attendance }) => attendance)
    const { currentUser, coachesList, isLoadingCoachesList } = useAppSelector(({ users }) => users)
    const { studentsList, studentsListLoading } = useAppSelector(({ students }) => students)
    const { studentsGroups, isLoadingStudentsGroups } = useAppSelector(({ studentsGroups }) => studentsGroups)
    const { learningTopicsList, isLoadingFilteredLearningTopics, isLoadingLearningTopics } = useAppSelector(({ learningTopics }) => learningTopics)
    const { tasksList, isLoadingTasks, filteredTasksList, isLoadingFilteredTasks } = useAppSelector(({ tasks }) => tasks)
    const { qualitiesList, isLoadingQualitities } = useAppSelector(({ quality }) => quality)

    const [coach, setCoach] = useState<CoachUser>()
    const [learningTopic, setLearningTopic] = useState<LearningTopics>()
    const [student, setStudent] = useState<Student>()
    const [group, setGroup] = useState<StudentsGroup>()
    const [tasks, setTasks] = useState<Task[]>([])
    const [additionalTasks, setAdditionalTasks] = useState<Task[]>([])
    const [homeworkDone, setHomeworkDone] = useState(false)
    const [isOnline, setIsOnline] = useState(false)
    const [meetLink, setMeetLink] = useState<string>("")
    const [startDate, setStartDate, { utcValue: startDateUtc }] = useDateInput();
    const [endDate, setEndDate, { utcValue: endDateUtc }] = useDateInput();
    const [quality, setQuality] = useState<Quality>()
    const [type, setType] = useState<AttendanceTypes>("REGULAR")

    useEffect(() => {
        dispatch(getAllStudents())
        dispatch(getCoachesList())
        dispatch(getStudentsGroups())
        dispatch(getTasks({}))
        dispatch(getQualitiesList({ labelFor: 'attendance' }))
    }, [dispatch])

    useEffect(() => {
        if (type === "TRIAL" || type === "REGULAR") {
            if (student && student.id && student.level.id) {
                dispatch(getFilteredLearningTopics({
                    levelId: student.level.id
                }))
            } else {
                dispatch(handleClearLearningTopicsList())
                dispatch(handleClearGetFilteredLearningTopic())
            }
        } else if (type === "GROUP") {
            dispatch(getLearningTopics())
        }
    }, [student, type])

    useEffect(() => {
        if (learningTopic && learningTopic.id) {
            dispatch(getFilteredTasks({
                learningTopicId: learningTopic.id
            }))
        } else {
            dispatch(handleClearFilteredTasksList())
        }
    }, [learningTopic])

    useEffect(() => {
        if (isLoadingCoachesList === "SUCCESS") {
            setCoach(coachesList[0])
        }
    }, [isLoadingCoachesList])

    useEffect(() => {
        if (isCreatedAttendance === "SUCCESS") {
            dispatch(addNotification({
                title: 'Занятие создано!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isCreatedAttendance === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при создании занятия',
                variant: 'error',
                autoCloseTimer: 2000,
            }))
        }
    }, [isCreatedAttendance, dispatch])

    const closeModal = () => {
        dispatch(getAttendances({
            date: selectedDate,
        }))
        dispatch(handleChangeIsCreatedAttendance())
        dispatch(handleCloseModal())
    }

    const handleCreateAttendance = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!currentUser || (!student && !group)) {
            return
        }

        const attendance: AttendanceWithoutId = {
            learningTopic: learningTopic,
            student: student,
            group: group,
            coach: {
                id: coach.id,
                firstName: coach.userData.firstName,
                lastName: coach.userData.lastName,
            },
            homeworkDone: homeworkDone,
            isOnline: isOnline,
            meetLink: meetLink,
            isFreeze: false,
            startDate: startDateUtc,
            endDate: endDateUtc,
            quality: quality || qualitiesList[0],
            type: type,
            tasks: tasks,
            additionalTasks: additionalTasks,
        }

        await dispatch(createAttendance({ attendance: attendance }))
    }

    const handleChangeCoach = (option: Option) => {
        const newCoach = coachesList.find((c) => c.id === option.value)

        if (newCoach) {
            setCoach(newCoach)
        } else {
            setCoach(coachesList[0])
        }
    }

    const handleChangeType = (option: Option) => {
        setType(option.value as AttendanceTypes)
    }

    const handleChangeStudent = (option: Option) => {
        const newStudent = studentsList.find((s) => s.id === option.value)

        if (newStudent) {
            setStudent(newStudent)
        } else {
            setStudent(studentsList[0])
        }
    }

    const handleChangeGroup = (option: Option) => {
        const newGroup = studentsGroups.find((sg) => sg.id === option.value)

        if (newGroup) {
            setGroup(newGroup)
        } else {
            setGroup(studentsGroups[0])
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

    const handleChangeLearningTopic = (option: Option) => {
        const newLearningTopic = learningTopicsList.find((lt) => lt.id === option.value)

        if (newLearningTopic) {
            setLearningTopic(newLearningTopic)
        } else {
            setLearningTopic(learningTopicsList[0])
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

    const isDisabledLearningTopics = () => {
        if (type === "REGULAR" || type === "TRIAL") {
            return isLoadingFilteredLearningTopics !== "SUCCESS"
        } else {
            return isLoadingLearningTopics !== "SUCCESS"
        }
    }

    return (
        <CreateAttendanceModal onClick={(e) => e.stopPropagation()}>
            <CloseButton>
                <ClearIcon onClick={closeModal} />
            </CloseButton>
            <CreateAttendanceFormTitle className="create-attendance-form-title">Новое занятие</CreateAttendanceFormTitle>
            {(studentsListLoading === "SUCCESS" && isLoadingQualitities === "SUCCESS" && currentUser) ?
                <CreateAttendanceForm onSubmit={handleCreateAttendance}>
                    <InputsBlock>
                        <BaseSelect
                            value={coach?.id || ""}
                            options={coachesList.map((coach) => ({
                                text: `${coach.userData.firstName} ${coach.userData.lastName}`,
                                value: coach.id
                            }))}
                            handleSelect={handleChangeCoach}
                            label="Тренер"
                            placeholder="Выберите тренера..."
                            required
                            isDisabled={currentUser.role !== 'admin' || isLoadingCoachesList !== "SUCCESS"}
                        />

                        <BaseSelect
                            value={type || ""}
                            options={ATTENDANCE_TYPES}
                            handleSelect={handleChangeType}
                            label="Тип занятия"
                            required
                            placeholder="Выберите тип..."
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
                                isDisabled={isLoadingStudentsGroups !== "SUCCESS"}
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
                            isDisabled={isDisabledLearningTopics()}
                            required
                        />
                        <BaseInput
                            value={startDate.toLocaleString()}
                            handleInput={(event) => setStartDate(event.target.value)}
                            label="Начало занятия"
                            type="datetime-local"
                            required
                        />
                        <BaseInput
                            value={endDate.toLocaleString()}
                            handleInput={(event) => setEndDate(event.target.value)}
                            label="Окончание занятия"
                            type="datetime-local"
                            required
                        />
                        <MultiSelect
                            value={tasks}
                            options={filteredTasksList}
                            handleInput={handleChangeTasks}
                            label="Задачи"
                            placeholder="Выберите задачи"
                            isDisabled={!Boolean(learningTopic && isLoadingFilteredTasks === "SUCCESS")}
                        />
                        <MultiSelect
                            value={additionalTasks}
                            options={tasksList}
                            handleInput={handleChangeAdditionalTasks}
                            label="Дополнительные задачи"
                            placeholder="Выберите задачи"
                            isDisabled={isLoadingTasks !== "SUCCESS"}
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
                        /> */}
                    </InputsBlock>
                    <SwitchesBlock>
                        <BaseSwitch
                            checked={isOnline}
                            handleChange={() => setIsOnline(!isOnline)}
                            label="Онлайн занятие"
                        />
                        <BaseSwitch
                            checked={homeworkDone}
                            handleChange={() => setHomeworkDone(!homeworkDone)}
                            label="ДЗ сделано"
                        />
                    </SwitchesBlock>
                    {
                        Boolean(isOnline) &&
                        <BaseInput
                            value={meetLink}
                            handleInput={(event) => setMeetLink(event.target.value)}
                            label="Ссылка на онлайн-встречу"
                        />
                    }
                    <TextButton
                        text={'Создать занятие'}
                        style={{ marginTop: "2rem", height: "4rem", width: "50%", marginLeft: "25%" }}
                        role="submit"
                    />
                </CreateAttendanceForm>
                :
                <Loader />
            }
        </CreateAttendanceModal>
    )
}