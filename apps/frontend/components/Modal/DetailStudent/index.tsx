import React, { useEffect, useState } from "react"
import { BaseInput } from "../../../atoms/BaseInput/Input"
import { type Student } from "../../../store/students/types"

import { TextButton } from "../../../atoms/TextButton"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { getAllStudents } from "../../../store/students/thunk/get-all-students"
import { addNotification, handleCloseModal } from "../../../store/system"
import { getLevels } from "../../../store/levels/thunk/get-levels"
import { BaseSelect } from "../../../atoms/BaseSelect"
import { type Level } from "../../../store/levels/types"
import { DetailStudentModal, DetailStudentFormTitle, DetailStudentForm, InputsBlock, CloseButton } from "./styled"
import { dateToHTMLValidate } from "../../../utils/date-to-html-validate"
import { updateStudent } from "../../../store/students/thunk/update-student"
import { dateToLocaleISO } from "../../../utils/date-to-locale-iso"
import { removeStudent } from "../../../store/students/thunk/remove-student"
import { handleClearIsRemoveStudent, handleClearIsUpdateStudent } from "../../../store/students"
import { ClearIcon } from "../../../assets/ClearIcon"

type Option = { text: string, value: string }

export const DetailStudent = () => {
    const { selectedStudent, isUpdatedStudent, isRemoveStudent } = useAppSelector(({ students }) => students)

    const [firstName, setFirstName] = useState(selectedStudent.firstName)
    const [lastName, setLastName] = useState(selectedStudent.lastName)
    const [birthDate, setBirthDate] = useState(selectedStudent.birthDate ? new Date(selectedStudent.birthDate) : null)
    const [level, setLevel] = useState<Level>(selectedStudent.level)
    const [fshrId, setFshrId] = useState(selectedStudent.fshrId ? String(selectedStudent.fshrId) : "")
    const [fideId, setFideId] = useState(selectedStudent.fideId ? String(selectedStudent.fideId) : "")
    const [phone, setPhone] = useState(selectedStudent.phone)
    const [email, setEmail] = useState(selectedStudent.email)
    const [joinDate, setJoinDate] = useState(selectedStudent.joinDate ? new Date(selectedStudent.joinDate) : null)
    const [notes, setNotes] = useState(selectedStudent.notes)
    const [paidLessons, setPaidLessons] = useState(selectedStudent.paidLessons)

    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [birthDateError, setBirthDateError] = useState(false)
    const [levelError, setLevelError] = useState(false)
    const [fshrIdError, setFshrIdError] = useState(false)
    const [fideIdError, setFideIdError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [joinDateError, setJoinDateError] = useState(false)
    const [notesError, setNotesError] = useState(false)
    const [paidLessonsError, setPaidLessonsError] = useState(false)

    const dispatch = useAppDispatch()

    const { levelsList, isLoadingLevels } = useAppSelector(({ levels }) => levels)

    useEffect(() => {
        dispatch(getLevels())
    }, [dispatch])

    useEffect(() => {
        if (isUpdatedStudent === "SUCCESS") {
            dispatch(addNotification({
                title: 'Ученик отредактирован!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isUpdatedStudent === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при редактировании ученика!',
                variant: "error",
                autoCloseTimer: 2000,
            }))
        }

        if (isRemoveStudent === "SUCCESS") {
            dispatch(addNotification({
                title: 'Ученик исключен!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isRemoveStudent === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при исключении ученика!',
                variant: "error",
                autoCloseTimer: 2000,
            }))
        }
    }, [isUpdatedStudent, isRemoveStudent, dispatch])

    const closeModal = () => {
        dispatch(getAllStudents())
        dispatch(handleClearIsUpdateStudent())
        dispatch(handleClearIsRemoveStudent())
        dispatch(handleCloseModal())
    }

    const handleCreateStudent = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!firstName.trim()) {
            setFirstNameError(true)
            return
        }

        if (!lastName.trim()) {
            setLastNameError(true)
            return
        }

        if (!level || !level.id) {
            setLevelError(true)
            return
        }

        const student: Student = {
            id: selectedStudent.id,
            firstName,
            lastName,
            birthDate: dateToLocaleISO(new Date(birthDate)),
            level,
            fshrId: fshrId ? Number(fshrId) : null,
            fideId: fideId ? Number(fideId) : null,
            phone,
            email,
            joinDate: dateToLocaleISO(new Date(joinDate)),
            notes: notes,
            paidLessons: 0,
            isExcluded: selectedStudent?.isExcluded || false,
        }

        await dispatch(updateStudent({ student: student }))
    }

    const handleChangeLevel = (option: Option) => {
        const newLevel = levelsList.find((s) => s.id === option.value)

        if (newLevel) {
            setLevel(newLevel)
        } else {
            setLevel(levelsList[0])
        }

        setLevelError(false)
    }

    const handleChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value)
        setFirstNameError(false)
    }

    const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value)
        setLastNameError(false)
    }

    const handleChangeBirthDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBirthDate(new Date(event.target.value))
        setBirthDateError(false)
    }

    const handleChangeFshrId = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFshrId(event.target.value)
        setFshrIdError(false)
    }

    const handleChangeFideId = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFideId(event.target.value)
        setFideIdError(false)
    }

    const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value)
        setPhoneError(false)
    }

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
        setEmailError(false)
    }

    const handleChangeJoinDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJoinDate(new Date(event.target.value))
        setJoinDateError(false)
    }

    const handleChangePaidLessons = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaidLessons(Number(event.target.value))
        setPaidLessonsError(false)
    }

    const handleRemoveStudent = async () => {
        await dispatch(removeStudent({ studentId: selectedStudent.id }))
    }

    return (
        <DetailStudentModal onClick={(e) => e.stopPropagation()}>
            <CloseButton>
                <ClearIcon onClick={closeModal} />
            </CloseButton>
            <DetailStudentFormTitle className="detail-students-form-title">Редактировать ученика</DetailStudentFormTitle>
            {isLoadingLevels === "SUCCESS" &&
                <DetailStudentForm onSubmit={handleCreateStudent}>
                    <InputsBlock>
                        <BaseInput
                            value={firstName}
                            handleInput={handleChangeFirstName}
                            label="Имя"
                            required
                            isError={firstNameError}
                            errorMessage="Введите имя"
                        />
                        <BaseInput
                            value={lastName}
                            handleInput={handleChangeLastName}
                            label="Фамилия"
                            required
                            isError={lastNameError}
                            errorMessage="Введите фамилию"
                        />
                        <BaseInput
                            value={dateToHTMLValidate(birthDate)}
                            handleInput={handleChangeBirthDate}
                            label="Дата рождения"
                            type="date"
                            max={dateToHTMLValidate(new Date())}
                            isError={birthDateError}
                            errorMessage="Введите дату рождения"
                        />
                        <BaseSelect
                            value={level?.id || ""}
                            options={levelsList.map(({ id, name }) => {
                                return {
                                    value: id,
                                    text: name,
                                }
                            })}
                            handleSelect={handleChangeLevel}
                            label="Уровень"
                            required
                        />
                        <BaseInput
                            value={String(fshrId)}
                            handleInput={handleChangeFshrId}
                            label="ФШР ID"
                            type="number"
                            isError={fshrIdError}
                            errorMessage="ФШР ID должен быть числом"
                        />
                        <BaseInput
                            value={String(fideId)}
                            handleInput={handleChangeFideId}
                            label="ФИДЕ ID"
                            type="number"
                            isError={fideIdError}
                            errorMessage="ФИДЕ ID должен быть числом"
                        />
                        <BaseInput
                            value={phone}
                            handleInput={handleChangePhone}
                            label="Телефон"
                            type="phone"
                            isError={phoneError}
                            errorMessage="Введите номер телефона"
                        />
                        <BaseInput
                            value={email}
                            handleInput={handleChangeEmail}
                            label="E-Mail"
                            isError={emailError}
                            errorMessage="Введите e-mail"
                        />
                        <BaseInput
                            value={joinDate ? dateToHTMLValidate(joinDate) : null}
                            handleInput={handleChangeJoinDate}
                            label="Дата присоединения к клубу"
                            type="date"
                            max={dateToHTMLValidate(new Date())}
                            isError={joinDateError}
                            errorMessage="Введите дату зачисления в клуб"
                        />
                        <BaseInput
                            value={notes}
                            handleInput={(event) => setNotes(event.target.value)}
                            label="Заметки"
                        />
                        <BaseInput
                            value={String(paidLessons)}
                            handleInput={handleChangePaidLessons}
                            label="Оплаченные занятия"
                            type={"number"}
                            isError={paidLessonsError}
                            errorMessage="Введите количество оплаченных занятий"
                        />
                    </InputsBlock>
                    <InputsBlock>
                        <TextButton
                            text={'Сохранить изменения'}
                            style={{ marginTop: "2rem", height: '4rem' }}
                            role="submit"
                        />
                        <TextButton
                            text={'Исключить ученика'}
                            style={{ marginTop: "2rem", height: '4rem' }}
                            type="button"
                            backgroundColor="#f6aaaaff"
                            onClick={handleRemoveStudent}
                        />
                    </InputsBlock>
                </DetailStudentForm>
            }
        </DetailStudentModal>
    )
}