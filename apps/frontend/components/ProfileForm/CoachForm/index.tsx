import React, { useEffect, useState } from "react";
import { StyledForm } from "./styled";
import { BaseInput } from "../../../atoms/BaseInput/Input";
import { dateToHTMLValidate } from "../../../utils/date-to-html-validate";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { TextButton } from "../../../atoms/TextButton";
import { BaseTextarea } from "../../../atoms/BaseTextarea";
import { usePlatform } from "../../../hooks/use-platform";
import { type CoachData, type CoachUser } from "../../../store/users/types";
import { updateCoachData } from "../../../store/users/thunk/update-coach-data";
import { dateToLocaleISO } from "../../../utils/date-to-locale-iso";
import { getUser } from "../../../store/users/thunk/get-user";
import { handleClearIsUpdateCoachData, handleClearUpdateErrorMessage } from "../../../store/users";

type Props = {
    currentUser: CoachUser,
    isEditable: boolean;
    onSave: () => void
}

export const CoachForm: React.FC<Props> = ({ currentUser, isEditable, onSave }) => {
    const { isUpdatedCoachData, updateErrorMessage } = useAppSelector(({ users }) => users);
    const platform = usePlatform();
    const dispatch = useAppDispatch();

    const [firstName, setFirstName] = useState<string>(currentUser?.userData?.firstName)
    const [lastName, setLastName] = useState<string>(currentUser?.userData?.lastName)
    const [login, setLogin] = useState<string>(currentUser.username)
    const [birthDate, setBirthDate] = useState<string>(currentUser?.userData?.birthDate)
    const [phone, setPhone] = useState<string>(currentUser?.userData?.phone)
    const [email, setEmail] = useState<string>(currentUser?.userData?.email)
    const [biography, setBiography] = useState<string>(currentUser?.userData?.biography)

    useEffect(() => {
        if (isUpdatedCoachData === "SUCCESS") {
            dispatch(getUser())
            dispatch(handleClearIsUpdateCoachData())
            dispatch(handleClearUpdateErrorMessage({ updateErrorMessage: null }))
            onSave()
        }
    }, [isUpdatedCoachData])

    const textAreaStyles = {
        gridColumn: platform === "desktop" ? "1 / 3" : "1"
    }

    const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newCoach: CoachData = {
            id: currentUser.id,
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            phone: phone,
            email: email,
            biography: biography,
            joinDate: dateToLocaleISO(new Date(currentUser.userData.joinDate)),
            isFired: false
        }

        const newUser: CoachUser = {
            ...currentUser,
            username: login,
            userData: newCoach,
        }

        await dispatch(updateCoachData({ coachUser: newUser }))
    }

    const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (updateErrorMessage) {
            dispatch(handleClearUpdateErrorMessage({ updateErrorMessage: null }))
        }

        setLogin(event.target.value)
    }

    return (
        <StyledForm onSubmit={handleClick}>
            <BaseInput
                value={firstName}
                label="Имя"
                handleInput={(event) => setFirstName(event.target.value)}
                isDisabled={!isEditable}
                inputMode="text"
                type="text"
            />

            <BaseInput
                value={lastName}
                label="Фамилия"
                handleInput={(event) => setLastName(event.target.value)}
                isDisabled={!isEditable}
                inputMode="text"
                type="text"
            />

            <BaseInput
                value={login}
                label="Логин"
                id={'username'}
                name={'username'}
                handleInput={handleChangeLogin}
                isDisabled={!isEditable}
                errorMessage={updateErrorMessage}
                isError={isUpdatedCoachData === "ERROR"}
                inputMode="text"
                type="text"
            />

            <BaseInput
                value={birthDate}
                handleInput={(event) => setBirthDate(event.target.value)}
                isDisabled={!isEditable}
                label="Дата рождения"
                type="date"
                max={dateToHTMLValidate(new Date())}
            />

            <BaseInput
                value={phone}
                label="Телефон"
                handleInput={(event) => setPhone(event.target.value)}
                isDisabled={!isEditable}
                inputMode="tel"
                type="phone"
            />

            <BaseInput
                value={email}
                label="E-Mail"
                handleInput={(event) => setEmail(event.target.value)}
                isDisabled={!isEditable}
                inputMode="text"
                type="text"
            />

            <BaseTextarea
                value={biography}
                label="О себе"
                handleInput={(event) => setBiography(event.target.value)}
                isDisabled={!isEditable}
                inputMode="text"
                style={textAreaStyles}
            />

            <TextButton
                text='Сохранить'
                type={"submit"}
                style={{
                    height: "5rem",
                    fontSize: "1.2rem",
                    marginTop: "auto",
                    padding: "1rem 2rem",
                    gridColumn: "1 / -1",
                }}
            />
        </StyledForm>
    )
}