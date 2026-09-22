import React, { useEffect, useState } from "react"
import { BaseInput } from "../../../atoms/BaseInput/Input"
import { CreateCoachModal, CreateCoachForm, CreateCoachFormTitle, InputsBlock, CloseButton } from "./styled"

import { TextButton } from "../../../atoms/TextButton"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { addNotification, handleCloseModal } from "../../../store/system"
import { dateToHTMLValidate } from "../../../utils/date-to-html-validate"
import { ClearIcon } from "../../../assets/ClearIcon"
import { CoachData } from "../../../store/users/types"
import { BaseTextarea } from "../../../atoms/BaseTextarea"
import { usePlatform } from "../../../hooks/use-platform"
import { createCoach } from "../../../store/users/thunk/create-coach"
import { getCoachesList } from "../../../store/users/thunk/get-coaches-list"
import { handleClearIsCreatedCoach } from "../../../store/users"

export const CreateCoach = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [fshrId, setFshrId] = useState("")
    const [fideId, setFideId] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [joinDate, setJoinDate] = useState("")
    const [biography, setBiography] = useState("")

    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [birthDateError, setBirthDateError] = useState(false)
    const [fshrIdError, setFshrIdError] = useState(false)
    const [fideIdError, setFideIdError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [joinDateError, setJoinDateError] = useState(false)
    const [biographyError, setBiographyError] = useState(false)

    const dispatch = useAppDispatch()
    const platform = usePlatform()

    const { isCreatedCoach } = useAppSelector(({ users }) => users)

    useEffect(() => {
        if (isCreatedCoach === "SUCCESS") {
            dispatch(addNotification({
                title: 'Тренер добавлен!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isCreatedCoach === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при добавлении тренера',
                variant: 'error',
                autoCloseTimer: 2000,
            }))
        }
    }, [isCreatedCoach, dispatch])

    const closeModal = () => {
        dispatch(getCoachesList())
        dispatch(handleClearIsCreatedCoach())
        dispatch(handleCloseModal())
    }

    const handleCreateCoach = async (event: React.FormEvent<HTMLFormElement>) => {
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

        if (!birthDate) {
            setBirthDateError(true)
            return
        }

        if (!phone.trim()) {
            setPhoneError(true)
            return
        }

        const coach: Omit<CoachData, "id"> = {
            firstName,
            lastName,
            birthDate,
            fshrId: Number(fshrId),
            fideId: Number(fideId),
            phone,
            email,
            joinDate,
            biography,
            isFired: false,
        }

        await dispatch(createCoach({ coach: coach }))
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

    const textAreaStyles = {
        gridColumn: platform === "desktop" ? "1 / 3" : "1",
        height: "10rem"
    }

    const buttonStyles = {
        gridColumn: platform === "desktop" ? "1 / 3" : "1",
        height: '4rem',
        marginTop: 'auto',
        marginBottom: '0.8rem',
    }

    return (
        <CreateCoachModal onClick={(e) => e.stopPropagation()}>
            <CloseButton>
                <ClearIcon onClick={closeModal} />
            </CloseButton>
            <CreateCoachFormTitle className="create-coach-form-title">Новый тренер</CreateCoachFormTitle>
            <CreateCoachForm onSubmit={handleCreateCoach}>
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
                        required
                        max={dateToHTMLValidate(new Date())}
                        isError={birthDateError}
                        errorMessage="Введите дату рождения"
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
                        required
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
                        required
                        max={dateToHTMLValidate(new Date())}
                        isError={joinDateError}
                        errorMessage="Введите дату зачисления в клуб"
                    />
                    <BaseTextarea
                        value={biography}
                        handleInput={(event) => setBiography(event.target.value)}
                        label="О тренере"
                        style={textAreaStyles}
                    />

                    <TextButton
                        text={'Добавить тренера'}
                        style={buttonStyles}
                        role="submit"
                    />
                </InputsBlock>
            </CreateCoachForm>
        </CreateCoachModal>
    )
}