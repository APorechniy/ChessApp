import React, { useEffect, useState } from "react"
import { BaseInput } from "../../../atoms/BaseInput/Input"
import { DetailCoachModal, DetailCoachForm, DetailCoachFormTitle, InputsBlock, CloseButton } from "./styled"

import { TextButton } from "../../../atoms/TextButton"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { addNotification, handleCloseModal } from "../../../store/system"
import { dateToHTMLValidate } from "../../../utils/date-to-html-validate"
import { ClearIcon } from "../../../assets/ClearIcon"
import { CoachData } from "../../../store/users/types"
import { BaseTextarea } from "../../../atoms/BaseTextarea"
import { usePlatform } from "../../../hooks/use-platform"
import { getCoachesList } from "../../../store/users/thunk/get-coaches-list"
import { handleChangeEditableCoach, handleClearIsRemovedCoach, handleClearIsUpdateCoachData } from "../../../store/users"
import { dateToLocaleISO } from "../../../utils/date-to-locale-iso"
import { updateCoachData } from "../../../store/users/thunk/update-coach-data"
import { removeCoach } from "../../../store/users/thunk/remove-coach"

export const DetailCoach = () => {
    const { editableCoach, isUpdatedCoachData, isRemovedCoach } = useAppSelector(({ users }) => users)

    const [firstName, setFirstName] = useState(editableCoach.userData?.firstName)
    const [lastName, setLastName] = useState(editableCoach.userData?.lastName)
    const [birthDate, setBirthDate] = useState(editableCoach.userData?.birthDate ? new Date(editableCoach.userData?.birthDate) : null)
    const [fshrId, setFshrId] = useState(editableCoach.userData?.fshrId || "")
    const [fideId, setFideId] = useState(editableCoach.userData?.fideId || "")
    const [phone, setPhone] = useState(editableCoach.userData?.phone || "")
    const [email, setEmail] = useState(editableCoach.userData?.email || "")
    const [joinDate, setJoinDate] = useState(editableCoach.userData?.joinDate ? new Date(editableCoach.userData?.joinDate) : null)
    const [biography, setBiography] = useState(editableCoach.userData?.biography)

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

    useEffect(() => {
        if (isUpdatedCoachData === "SUCCESS") {
            dispatch(addNotification({
                title: 'Занятие создано!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isUpdatedCoachData === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при создании занятия!',
                variant: "error",
                autoCloseTimer: 2000,
            }))
        }

        if (isRemovedCoach === "SUCCESS") {
            dispatch(addNotification({
                title: 'Тренер удален!',
                variant: "success",
                autoCloseTimer: 2000,
            }))
            closeModal();
        }

        if (isRemovedCoach === "ERROR") {
            dispatch(addNotification({
                title: 'Ошибка при удалении тренера!',
                variant: "error",
                autoCloseTimer: 2000,
            }))
        }
    }, [isUpdatedCoachData, isRemovedCoach])

    const closeModal = () => {
        dispatch(getCoachesList())
        dispatch(handleChangeEditableCoach({ coach: null }))
        dispatch(handleClearIsUpdateCoachData())
        dispatch(handleClearIsRemovedCoach())
        dispatch(handleCloseModal())
    }

    const handleSaveCoach = async (event: React.FormEvent<HTMLFormElement>) => {
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

        const coach: CoachData = {
            id: editableCoach.userData?.id,
            firstName,
            lastName,
            birthDate: dateToLocaleISO(new Date(birthDate)),
            fshrId: Number(fshrId),
            fideId: Number(fideId),
            phone,
            email,
            joinDate: dateToLocaleISO(new Date(joinDate)),
            biography,
            isFired: false,
        }

        const user = {
            ...editableCoach,
            userData: coach,
        }

        await dispatch(updateCoachData({ coachUser: user }))
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

    const handleRemoveCoach = async () => {
        await dispatch(removeCoach({ coachId: editableCoach.userData?.id }))
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
        <DetailCoachModal onClick={(e) => e.stopPropagation()}>
            <CloseButton>
                <ClearIcon onClick={closeModal} />
            </CloseButton>
            <DetailCoachFormTitle className="detail-coach-form-title">Новый тренер</DetailCoachFormTitle>
            <DetailCoachForm onSubmit={handleSaveCoach}>
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
                        required
                        max={dateToHTMLValidate(new Date())}
                        isError={birthDateError}
                        errorMessage="Введите дату рождения"
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
                        value={dateToHTMLValidate(joinDate)}
                        handleInput={handleChangeJoinDate}
                        label="Дата присоединения к клубу"
                        type="date"
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
                        text={'Сохранить изменения'}
                        role={"submit"}
                        style={buttonStyles}
                    />
                    <TextButton
                        text={'Исключить тренера'}
                        style={buttonStyles}
                        type="button"
                        backgroundColor="#f6aaaaff"
                        onClick={handleRemoveCoach}
                    />
                </InputsBlock>
            </DetailCoachForm>
        </DetailCoachModal>
    )
}