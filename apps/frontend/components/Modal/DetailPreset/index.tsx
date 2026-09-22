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
    DetailPresetFormTitle,
    DetailPresetModal,
    DetailPresetForm,
    InputsBlock,
    CloseButton
} from "./styled"
import { Loader } from "../../../atoms/Loader"
import { ClearIcon } from "../../../assets/ClearIcon"
import { useDateInput } from "../../../hooks/use-date-input"
import { type StudentsGroup } from "../../../store/students-groups/types"
import { getStudentsGroups } from "../../../store/students-groups/thunk/get-students-groups"
import { MultiSelect } from "../../../atoms/MultiSelect"
import { getAttendancePresets } from "../../../store/attendance-presets/thunk/get-attendance-presets"
import { type AttendancePreset } from "../../../store/attendance-presets/types"
import { RRULE_DAYS, type Day } from "../../../content/calendar"
import { handleClearCurrentAttendancePreset, handleClearIsDeletedPreset, handleClearIsUpdatedPreset } from "../../../store/attendance-presets"
import { updateAttendancePreset } from "../../../store/attendance-presets/thunk/update-attendance-preset"
import { dateToHTMLValidate } from "../../../utils/date-to-html-validate"
import { deleteAttendancePreset } from "../../../store/attendance-presets/thunk/delete-attendance-preset"

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

export const DetailPreset = () => {
    const dispatch = useAppDispatch()

    const {
        isUpdatedAttendancePreset,
        isDeletedAttendancePreset,
        currentAttendancePreset
    } = useAppSelector(({ attendancePresets }) => attendancePresets)
    const { currentUser } = useAppSelector(({ users }) => users)
    const { studentsList, studentsListLoading } = useAppSelector(({ students }) => students)
    const { studentsGroups, isLoadingStudentsGroups } = useAppSelector(({ studentsGroups }) => studentsGroups)

    const [student, setStudent] = useState<Student>(currentAttendancePreset?.student)
    const [group, setGroup] = useState<StudentsGroup>(currentAttendancePreset?.group)
    const [rule, setRule] = useState<Array<Day>>([])
    const [startTime, setStartTime] = useState<string>(currentAttendancePreset.startTimeLocal);
    const [endTime, setEndTime] = useState<string>(currentAttendancePreset.endTimeLocal);
    const [type, setType] = useState<AttendanceTypes>(currentAttendancePreset.type)
    const [endDate, setEndDate, { utcValue: endDateUtc }] = useDateInput({
        initialValue: currentAttendancePreset.endDate
    });

    useEffect(() => {
        dispatch(getAllStudents())
        dispatch(getStudentsGroups())
    }, [dispatch])

    useEffect(() => {
        if (isUpdatedAttendancePreset === "SUCCESS") {
            dispatch(addNotification({
                title: 'Шаблон отредактирован!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isUpdatedAttendancePreset === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при редактировании шаблона!',
                variant: "error",
                autoCloseTimer: 2000,
            }))
        }

        if (isDeletedAttendancePreset === "SUCCESS") {
            dispatch(addNotification({
                title: 'Шаблон удален!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isDeletedAttendancePreset === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при удалении шаблона!',
                variant: "error",
                autoCloseTimer: 2000,
            }))
        }
    }, [isUpdatedAttendancePreset, isDeletedAttendancePreset, dispatch])

    useEffect(() => {
        if (currentAttendancePreset && currentAttendancePreset.rrule) {
            const selectedDays: Day[] = []

            currentAttendancePreset.rrule.split('BYDAY=')[1].split(',').forEach((r) => {
                const day = RRULE_DAYS.find(d => d.rrule === r)

                if (day) {
                    selectedDays.push(day)
                }
            })

            setRule(selectedDays)
        }
    }, [currentAttendancePreset])

    const closeModal = () => {
        dispatch(getAttendancePresets())
        dispatch(handleClearIsUpdatedPreset())
        dispatch(handleClearIsDeletedPreset())
        dispatch(handleClearCurrentAttendancePreset())
        dispatch(handleCloseModal())
    }

    const handleUpdateAttendancePreset = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const currDate = new Date();

        const transformingRule = rule.reduce((prev, curr) => {
            return prev + `${curr.rrule},`
        }, `DTSTART=${dateToHTMLValidate(currDate).replaceAll('-', "")};FREQ=WEEKLY;BYDAY=`);

        const finalRRule = transformingRule.slice(0, transformingRule.length - 1)

        if (!currentUser || (!student && !group)) {
            return
        }

        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const attendancePreset: AttendancePreset = {
            id: currentAttendancePreset.id,
            student: student,
            group: group,
            startTimeLocal: startTime,
            endTimeLocal: endTime,
            type: type,
            rrule: finalRRule,
            timezone: userTimezone,
            endDate: endDateUtc,
            excludedDates: currentAttendancePreset.excludedDates
        }

        await dispatch(updateAttendancePreset({ attendancePreset: attendancePreset }))
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

    const handleRemovePreset = () => {
        dispatch(deleteAttendancePreset({
            attendancePresetId: currentAttendancePreset.id
        }))
    }

    return (
        <DetailPresetModal onClick={(e) => e.stopPropagation()}>
            <CloseButton>
                <ClearIcon onClick={closeModal} />
            </CloseButton>
            <DetailPresetFormTitle className="detail-attendance-preset-form-title">Редактировать шаблон</DetailPresetFormTitle>
            {(studentsListLoading === "SUCCESS" && currentUser) ?
                <DetailPresetForm onSubmit={handleUpdateAttendancePreset}>
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

                        <TextButton
                            text={'Сохранить изменения'}
                            role="submit"
                            style={{ height: "4rem" }}
                        />
                        <TextButton
                            text={'Удалить шаблон'}
                            onClick={handleRemovePreset}
                            style={{ height: "4rem" }}
                            backgroundColor="#f6aaaaff"
                        />
                    </InputsBlock>
                </DetailPresetForm>
                :
                <Loader />
            }
        </DetailPresetModal>
    )
}