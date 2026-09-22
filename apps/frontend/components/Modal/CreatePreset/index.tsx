import React, { useEffect, useState } from "react"
import { BaseInput } from "../../../atoms/BaseInput/Input"

import { type Student } from "../../../store/students/types"

import { TextButton } from "../../../atoms/TextButton"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { getAllStudents } from "../../../store/students/thunk/get-all-students"
import { addNotification, handleCloseModal } from "../../../store/system"
import { BaseSelect } from "../../../atoms/BaseSelect"
import { type AttendanceTypes, } from "../../../store/attendance/types"
import {
    CreatePresetFormTitle,
    CreatePresetModal,
    CreatePresetForm,
    InputsBlock,
    CloseButton
} from "./styled"
import { Loader } from "../../../atoms/Loader"
import { ClearIcon } from "../../../assets/ClearIcon"
import { type StudentsGroup } from "../../../store/students-groups/types"
import { getStudentsGroups } from "../../../store/students-groups/thunk/get-students-groups"
import { MultiSelect } from "../../../atoms/MultiSelect"
import { handleClearIsCreatedPreset } from "../../../store/attendance-presets"
import { getAttendancePresets } from "../../../store/attendance-presets/thunk/get-attendance-presets"
import { AttendancePresetWithoutId } from "../../../store/attendance-presets/types"
import { createAttendancePreset } from "../../../store/attendance-presets/thunk/create-attendance-preset"
import { RRULE_DAYS, type Day } from "../../../content/calendar"
import { useDateInput } from "../../../hooks/use-date-input"
import { dateToHTMLValidate } from "../../../utils/date-to-html-validate"

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
        text: "Групповое",
        value: "GROUP"
    },
]

export const CreatePreset = () => {
    const dispatch = useAppDispatch()

    const { isCreatedAttendancePreset } = useAppSelector(({ attendancePresets }) => attendancePresets)
    const { currentUser } = useAppSelector(({ users }) => users)
    const { studentsList, studentsListLoading } = useAppSelector(({ students }) => students)
    const { studentsGroups, isLoadingStudentsGroups } = useAppSelector(({ studentsGroups }) => studentsGroups)

    const [student, setStudent] = useState<Student>()
    const [group, setGroup] = useState<StudentsGroup>()
    const [rule, setRule] = useState<Array<Day>>([])
    const [startTime, setStartTime] = useState<string>();
    const [endTime, setEndTime] = useState<string>();
    const [type, setType] = useState<AttendanceTypes>("REGULAR")
    const [endDate, setEndDate, { utcValue: endDateUtc }] = useDateInput();

    useEffect(() => {
        dispatch(getAllStudents())
        dispatch(getStudentsGroups())
    }, [dispatch])

    useEffect(() => {
        if (isCreatedAttendancePreset === "SUCCESS") {
            dispatch(addNotification({
                title: 'Шаблон занятия создан!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isCreatedAttendancePreset === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при создании шаблона занятия',
                variant: 'error',
                autoCloseTimer: 2000,
            }))
        }
    }, [isCreatedAttendancePreset, dispatch])

    const closeModal = () => {
        dispatch(getAttendancePresets())
        dispatch(handleClearIsCreatedPreset())
        dispatch(handleCloseModal())
    }

    const handleCreateAttendancePreset = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const currDate = new Date()

        const transformingRule = rule.reduce((prev, curr) => {
            return prev + `${curr.rrule},`
        }, `DTSTART=${dateToHTMLValidate(currDate).replaceAll('-', "")};FREQ=WEEKLY;BYDAY=`);

        const finalRRule = transformingRule.slice(0, transformingRule.length - 1)

        if (!currentUser || (!student && !group)) {
            return
        }

        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const attendancePreset: AttendancePresetWithoutId = {
            student: student,
            group: group,
            startTimeLocal: startTime,
            endTimeLocal: endTime,
            timezone: userTimezone,
            type: type,
            rrule: finalRRule,
            endDate: endDateUtc,
        }

        await dispatch(createAttendancePreset({ attendancePreset: attendancePreset }))
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

    const handleChangeRule = (option: Day) => {
        const newDays = [...rule]
        const index = newDays.findIndex((d) => d.id === option.id)

        if (index >= 0) {
            newDays.splice(index, 1)
        } else {
            newDays.push(option)
        }

        setRule(newDays)
    }

    return (
        <CreatePresetModal onClick={(e) => e.stopPropagation()}>
            <CloseButton>
                <ClearIcon onClick={closeModal} />
            </CloseButton>
            <CreatePresetFormTitle className="create-attendance-preset-form-title">Новый шаблон</CreatePresetFormTitle>
            {(studentsListLoading === "SUCCESS" && currentUser) ?
                <CreatePresetForm onSubmit={handleCreateAttendancePreset}>
                    <InputsBlock>
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
                        <BaseInput
                            value={startTime}
                            handleInput={(event) => setStartTime(event.target.value)}
                            label="Начало занятия"
                            type="time"
                            required
                        />
                        <BaseInput
                            value={endTime}
                            handleInput={(event) => setEndTime(event.target.value)}
                            label="Окончание занятия"
                            type="time"
                            required
                        />

                        <MultiSelect
                            value={rule}
                            options={RRULE_DAYS}
                            handleInput={handleChangeRule}
                            label="Дни занятий"
                            placeholder="Выберите дни"
                            required
                        />

                        <BaseInput
                            value={endDate.toLocaleString()}
                            handleInput={(event) => setEndDate(event.target.value)}
                            label="Окончание ряда"
                            type="datetime-local"
                            required
                        />
                    </InputsBlock>
                    <TextButton
                        text={'Создать шаблон'}
                        style={{ marginTop: "2rem", height: "4rem", width: "50%", marginLeft: "25%" }}
                        role="submit"
                    />
                </CreatePresetForm>
                :
                <Loader />
            }
        </CreatePresetModal>
    )
}