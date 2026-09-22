import React, { useEffect, useState } from "react"
import { BaseInput } from "../../../atoms/BaseInput/Input"
import { CreateStudentModal, CreateStudentForm, CreateStudentFormTitle, InputsBlock, CloseButton, NotifyBlock, NotifyText } from "./styled"
import { type Student } from "../../../store/students/types"

import { TextButton } from "../../../atoms/TextButton"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { getAllStudents } from "../../../store/students/thunk/get-all-students"
import { addNotification, handleCloseModal } from "../../../store/system"
import { BaseSelect } from "../../../atoms/BaseSelect"

import { type Level } from "../../../store/levels/types"
import { getLevels } from "../../../store/levels/thunk/get-levels"
import { createStudent } from "../../../store/students/thunk/create-student"
import { dateToHTMLValidate } from "../../../utils/date-to-html-validate"
import { handleChangeIsCreatedStudent } from "../../../store/students"
import { ClearIcon } from "../../../assets/ClearIcon"

type Option = { text: string, value: string }

export const CreateStudent = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthDate, setBirthDate] = useState(null)
    const [level, setLevel] = useState<Level>()
    const [fshrId, setFshrId] = useState(null)
    const [fideId, setFideId] = useState(null)
    const [phone, setPhone] = useState(null)
    const [email, setEmail] = useState(null)
    const [joinDate, setJoinDate] = useState(null)
    const [notes, setNotes] = useState(null)
    const [paidLessons, setPaidLessons] = useState("")

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

    const { isCreatedStudent } = useAppSelector(({ students }) => students)
    const { levelsList, isLoadingLevels } = useAppSelector(({ levels }) => levels)

    useEffect(() => {
        dispatch(getLevels())
    }, [dispatch])

    useEffect(() => {
        if (isCreatedStudent === "SUCCESS") {
            dispatch(addNotification({
                title: 'Студент добавлен!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isCreatedStudent === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при добавлении студента',
                variant: 'error',
                autoCloseTimer: 2000,
            }))
        }
    }, [isCreatedStudent, dispatch])

    const closeModal = () => {
        dispatch(getAllStudents())
        dispatch(handleChangeIsCreatedStudent())
        dispatch(handleCloseModal())
    }

    const handleCreateStudent = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!firstName.trim()) {
            setFirstNameError(true)
            return
        }

        if (fshrId && !Number(fshrId)) {
            setFshrIdError(true)
            return
        }

        if (fideId && !Number(fideId)) {
            setFideIdError(true)
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

        const student: Omit<Student, "id"> = {
            firstName,
            lastName,
            birthDate,
            level,
            fshrId: Number(fshrId),
            fideId: Number(fideId),
            phone,
            email,
            joinDate,
            notes,
            paidLessons: 0,
            isExcluded: false,
        }

        await dispatch(createStudent({ student: student }))
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
        setBirthDate(event.target.value)
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
        setJoinDate(event.target.value)
        setJoinDateError(false)
    }

    const handleChangePaidLessons = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaidLessons(event.target.value)
        setPaidLessonsError(false)
    }

    return (
        <CreateStudentModal onClick={(e) => e.stopPropagation()}>
            <CloseButton>
                <ClearIcon onClick={closeModal} />
            </CloseButton>
            <CreateStudentFormTitle className="create-students-form-title">Новый ученик</CreateStudentFormTitle>
            {isLoadingLevels === "SUCCESS" &&
                <CreateStudentForm onSubmit={handleCreateStudent}>
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
                            value={birthDate}
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
                            placeholder="Выберите уровень..."
                            required
                        />
                        <BaseInput
                            value={fshrId}
                            handleInput={handleChangeFshrId}
                            label="ФШР ID"
                            type="number"
                            isError={fshrIdError}
                            errorMessage="ФШР ID должен быть числом"
                        />
                        <BaseInput
                            value={fideId}
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
                            value={joinDate}
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
                            value={paidLessons}
                            handleInput={handleChangePaidLessons}
                            label="Оплаченные занятия"
                            type={"number"}
                            isError={paidLessonsError}
                            errorMessage="Введите количество оплаченных занятий"
                        />

                        <NotifyBlock>
                            {
                                isCreatedStudent === "ERROR" &&
                                <NotifyText>
                                    Ошибка при создании студента. Проверьте данные
                                </NotifyText>

                            }
                        </NotifyBlock>

                        <TextButton
                            text={'Добавить ученика'}
                            style={{ height: '4rem', marginTop: 'auto', marginBottom: '0.8rem', gridColumn: "1 / -1" }}
                            role="submit"
                        />
                    </InputsBlock>
                </CreateStudentForm>
            }
        </CreateStudentModal>
    )
}