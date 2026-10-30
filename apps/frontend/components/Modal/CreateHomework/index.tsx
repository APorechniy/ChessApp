import React, { useEffect, useState } from "react"
import { BaseInput } from "../../../atoms/BaseInput/Input"

import { TextButton } from "../../../atoms/TextButton"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { addNotification, handleCloseModal } from "../../../store/system"
import { MultiSelect } from "../../../atoms/MultiSelect"
import {
    CreateHomeworkForm,
    CreateHomeworkModal,
    CreateHomeworkFormTitle,
    CloseButton,
    InputsBlock,
    SwitchesBlock,
    StudentsAttendedList,
    StudentsAttendedName,
    StudentsAttendedRow
} from "./styled"
import { getLearningTopics } from "../../../store/learning-topics/thunk/get-learning-topics"
import { Loader } from "../../../atoms/Loader"
import { ClearIcon } from "../../../assets/ClearIcon"
import { handleClearIsCreatedHomework } from "../../../store/homeworks"
import { HomeworkWithoutId } from "../../../store/homeworks/types"
import { useDateInput } from "../../../hooks/use-date-input"
import { type Task } from "../../../store/tasks/types"
import { createHomework } from "../../../store/homeworks/thunk/create-homework"
import { getTasks } from "../../../store/tasks/thunk/get-tasks"
import { BaseSwitch } from "../../../atoms/BaseSwitch"
import { BaseSelect } from "../../../atoms/BaseSelect"
import { type Student } from "../../../store/students/types"
import { getAllStudents } from "../../../store/students/thunk/get-all-students"
import { getStudentsGroups } from "../../../store/students-groups/thunk/get-students-groups"
import { type StudentsGroup } from "../../../store/students-groups/types"
import { type Attendance } from "../../../store/attendance/types"
import { getHumanityFullDate } from "../../../utils/get-humanity-full-date"
import { getAttendancesAny } from "../../../store/attendance/thunk/get-attendances-any"
import { getHomeworksList } from "../../../store/homeworks/thunk/get-homeworks-list"

type Option = { text: string, value: string }

export const CreateHomework = () => {
    const [hasAttendance, setHasAttendance] = useState<boolean>(false)
    const [isGrouped, setIsGrouped] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [homeworkDueDate, setHomeworkDueDate, { utcValue: homeworkDueDateUtc }] = useDateInput();
    const [homeworkTasks, setHomeworkTasks] = useState<Task[]>([])
    const [student, setStudent] = useState<Student>()
    const [group, setGroup] = useState<StudentsGroup>()
    const [attendedList, setAttendedList] = useState<Student[]>([])
    const [selectAttendance, setSelectAttendance] = useState<Attendance>()

    const dispatch = useAppDispatch()

    const { attendancesListAny, attendancesListAnyLoading } = useAppSelector(({ attendance }) => attendance)
    const { tasksList, isLoadingTasks } = useAppSelector(({ tasks }) => tasks)
    const { studentsList, studentsListLoading } = useAppSelector(({ students }) => students)
    const { studentsGroups, isLoadingStudentsGroups } = useAppSelector(({ studentsGroups }) => studentsGroups)
    const { isCreatedHomework } = useAppSelector(({ homeworks }) => homeworks)

    const closeModal = () => {
        dispatch(getHomeworksList())
        dispatch(handleClearIsCreatedHomework())
        dispatch(handleCloseModal())
    }

    useEffect(() => {
        dispatch(getTasks({}))
        dispatch(getAllStudents())
        dispatch(getStudentsGroups())
    }, [dispatch])

    useEffect(() => {
        if (isCreatedHomework === "SUCCESS") {
            dispatch(addNotification({
                title: 'Домашнее задание создано!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isCreatedHomework === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при добавлении домашнего задания',
                variant: 'error',
                autoCloseTimer: 2000,
            }))
        }
    }, [isCreatedHomework, dispatch])

    const handleCreateHomework = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!homeworkDueDateUtc) {
            return
        }

        const newHomework: HomeworkWithoutId = {
            name: name,
            attendanceId: selectAttendance ? selectAttendance.id : undefined,
            expiresAt: homeworkDueDateUtc,
            tasks: homeworkTasks
        }

        await dispatch(createHomework({ homework: newHomework, studentsAttended: attendedList.map(s => s.id) }))
    }

    const handleChangeHomeworksTasks = (option: Task) => {
        const newTasks = [...homeworkTasks]
        const index = newTasks.findIndex((t) => t.id === option.id)

        if (index >= 0) {
            newTasks.splice(index, 1)
        } else {
            newTasks.push(option)
        }

        setHomeworkTasks(newTasks)
    }

    const handleChangeStudent = (option: Option) => {
        const newStudent = studentsList.find((s) => s.id === option.value)

        if (newStudent) {
            setStudent(newStudent)
            setAttendedList([newStudent])
        } else {
            setStudent(studentsList[0])
            setAttendedList([studentsList[0]])
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

    const handleChangeAttended = (student: Student) => {
        const studentIndex = attendedList.findIndex(s => s.id === student.id)

        if (studentIndex >= 0) {
            const newArray = [...attendedList]
            newArray.splice(studentIndex, 1)
            setAttendedList(newArray)
        } else {
            const newArray = [...attendedList, student]
            setAttendedList(newArray)
        }
    }

    const handleChangeHasAttendance = () => {
        const newHasAttendance = !hasAttendance

        if (newHasAttendance) {
            dispatch(getAttendancesAny({
                studentId: student?.id,
                groupId: group?.id,
            }))
        }

        setHasAttendance(newHasAttendance)
    }

    const handleChangeAttendance = (attendanceOption: Option) => {
        const newAttendance = attendancesListAny.find((a) => a.id === attendanceOption.value)

        if (newAttendance) {
            setSelectAttendance(newAttendance)
        }
    }

    return (
        <CreateHomeworkModal onClick={(e) => e.stopPropagation()}>
            <CloseButton>
                <ClearIcon onClick={closeModal} />
            </CloseButton>
            <CreateHomeworkFormTitle className="create-homework-title">Новое домашнее задание</CreateHomeworkFormTitle>
            {(isLoadingTasks === "SUCCESS" && tasksList.length) ?
                <CreateHomeworkForm onSubmit={handleCreateHomework}>
                    <BaseInput
                        value={name}
                        handleInput={(e) => setName(e.target.value)}
                        label="Название"
                        required
                    />

                    <InputsBlock>
                        <MultiSelect
                            value={homeworkTasks}
                            options={tasksList}
                            handleInput={handleChangeHomeworksTasks}
                            label="Задачи для ДЗ"
                            placeholder="Выберите задачи"
                            required
                            isDisabled={isLoadingTasks !== "SUCCESS"}
                        />

                        <BaseInput
                            value={homeworkDueDate}
                            handleInput={(event) => setHomeworkDueDate(event.target.value)}
                            label="Дата истечения ДЗ"
                            type="datetime-local"
                            required
                        />
                    </InputsBlock>

                    <SwitchesBlock>
                        <BaseSwitch
                            checked={isGrouped}
                            handleChange={() => setIsGrouped(!isGrouped)}
                            label="Групповое ДЗ"
                        />
                    </SwitchesBlock>

                    {
                        Boolean(!isGrouped && studentsListLoading === "SUCCESS") &&
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
                        isGrouped &&
                        <>
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
                            <StudentsAttendedList>
                                {
                                    group?.students.map((s) => (
                                        <StudentsAttendedRow key={s.id}>
                                            <StudentsAttendedName>{`${s.firstName} ${s.lastName}`}</StudentsAttendedName>
                                            <BaseSwitch
                                                checked={attendedList.findIndex((sa) => sa.id === s.id) >= 0}
                                                handleChange={() => handleChangeAttended(s)}
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
                        </>
                    }

                    <SwitchesBlock>
                        <BaseSwitch
                            checked={hasAttendance}
                            handleChange={handleChangeHasAttendance}
                            label="Прикрепить к занятию"
                        />
                    </SwitchesBlock>

                    {
                        Boolean(hasAttendance && attendancesListAnyLoading === "SUCCESS") &&
                        <BaseSelect
                            value={selectAttendance?.id || ""}
                            options={attendancesListAny.map((a) => {
                                return {
                                    text: getHumanityFullDate(a.startDate),
                                    value: a.id
                                }
                            })}
                            handleSelect={handleChangeAttendance}
                            label="Занятия"
                            placeholder="Выберите занятие"
                            isDisabled={attendancesListAnyLoading !== "SUCCESS"}
                        />
                    }

                    <TextButton
                        text={'Создать ДЗ'}
                        style={{ marginTop: "2rem", height: "4rem" }}
                        role="submit"
                    />
                </CreateHomeworkForm>
                :
                <Loader />
            }
        </CreateHomeworkModal>
    )
}