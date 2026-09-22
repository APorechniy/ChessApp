import React, { useEffect, useState } from "react";
import { StyledForm } from "./styled";
import { BaseInput } from "../../../atoms/BaseInput/Input";
import { dateToHTMLValidate } from "../../../utils/date-to-html-validate";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { TextButton } from "../../../atoms/TextButton";
import { type StudentUser } from "../../../store/users/types";
import { getUser } from "../../../store/users/thunk/get-user";
import { Student } from "../../../store/students/types";
import { handleClearIsUpdateStudentData, handleClearUpdateErrorMessage } from "../../../store/users";
import { updateStudentData } from "../../../store/users/thunk/update-student-data";

type Props = {
    currentUser: StudentUser
    isEditable: boolean;
    onSave: () => void
}

export const Form: React.FC<Props> = ({ currentUser, isEditable, onSave }) => {
    const { isUpdatedStudentData, updateErrorMessage } = useAppSelector(({ users }) => users)
    const [firstName] = useState<string>(currentUser?.userData?.firstName)
    const [lastName] = useState<string>(currentUser?.userData?.lastName)
    const [login, setLogin] = useState<string>(currentUser?.username)
    const [birthDate, setBirthDate] = useState<string>(currentUser?.userData?.birthDate)
    const [phone, setPhone] = useState<string>(currentUser?.userData?.phone)
    const [email, setEmail] = useState<string>(currentUser?.userData?.email)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isUpdatedStudentData === "SUCCESS") {
            dispatch(getUser())
            dispatch(handleClearIsUpdateStudentData())
            dispatch(handleClearUpdateErrorMessage({ updateErrorMessage: null }))
            onSave()
        }
    }, [isUpdatedStudentData])

    const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newStudent: Student = {
            ...currentUser.userData,
            birthDate: birthDate,
            phone: phone,
            email: email,
        }

        const newUser: StudentUser = {
            ...currentUser,
            username: login,
            userData: newStudent
        }

        await dispatch(updateStudentData({ studentUser: newUser }))
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
                handleInput={() => { }}
                isDisabled={true}
                inputMode="text"
                type="text"
            />

            <BaseInput
                value={lastName}
                label="Фамилия"
                handleInput={() => { }}
                isDisabled={true}
                inputMode="text"
                type="text"
            />

            <BaseInput
                value={login}
                label="Логин"
                handleInput={handleChangeLogin}
                isDisabled={!isEditable}
                errorMessage={updateErrorMessage}
                isError={isUpdatedStudentData === "ERROR"}
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

            <TextButton
                text='Сохранить'
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