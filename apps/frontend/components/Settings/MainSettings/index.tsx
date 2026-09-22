import React, { useEffect, useState } from "react";
import { StyledForm } from "./styled";
import { BaseInput } from "../../../atoms/BaseInput/Input";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { TextButton } from "../../../atoms/TextButton";
import { getSettings } from "../../../store/system/thunk/get-settings";
import { type Settings } from "../../../store/system/types";
import { updateSettings } from "../../../store/system/thunk/update-settings";
import { addNotification, handleChangeIsDisabledNotifications, handleClearIsUpdatedSettings } from "../../../store/system";
import { BaseSwitch } from "../../../atoms/BaseSwitch";

export const MainSettings = () => {
    const { settings, isUpdatedSettings, isDisabledNotifications } = useAppSelector(({ system }) => system);

    const [name, setName] = useState<string>(settings?.name)
    const [isErrorName, setIsErrorName] = useState<boolean>(false)
    const [vkLink, setVkLink] = useState<string>(settings?.vkLink)
    const [isVkLinkError, setIsVkLinkError] = useState<boolean>(false)
    const [phone, setPhone] = useState<string>(settings?.phone)
    const [email, setEmail] = useState<string>(settings?.email)
    const [isEmailError, setIsEmailError] = useState<boolean>(false)
    const [legalName, setLegalName] = useState<string>(settings?.legalName)
    const [isLegalNameError, setIsLegalNameError] = useState<boolean>(false)
    const [itin, setItin] = useState<string>(settings?.itin)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isUpdatedSettings === "SUCCESS" || isUpdatedSettings === "IDLE") {
            dispatch(getSettings())

            if (isUpdatedSettings === "SUCCESS") {
                dispatch(addNotification({
                    title: "Настройки обновлены!",
                    variant: "success",
                    autoCloseTimer: 2000
                }))
            }
        }

        if (isUpdatedSettings === "ERROR") {
            dispatch(addNotification({
                title: "Ошибка при обновлении настроек!",
                variant: "error",
                autoCloseTimer: 2000
            }))
        }

        return () => {
            dispatch(handleClearIsUpdatedSettings())
        }
    }, [isUpdatedSettings])

    const handleSave = () => {
        const withoutSystemSymbols = /["`;\\\x00-\x1F\x7F]/g

        if (withoutSystemSymbols.test(name)) {
            setIsErrorName(true)
            return
        }

        if (withoutSystemSymbols.test(vkLink)) {
            setIsVkLinkError(true)
            return
        }

        if (withoutSystemSymbols.test(email)) {
            setIsEmailError(true)
            return
        }

        if (withoutSystemSymbols.test(legalName)) {
            setIsLegalNameError(true)
            return
        }

        const updatedSettings: Settings = {
            ...settings,
            name: name,
            vkLink: vkLink,
            phone: phone,
            email: email,
            legalName: legalName,
            itin: itin
        }

        dispatch(updateSettings({ settings: updatedSettings }))
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsErrorName(false)
        setName(e.target.value)
    }

    const handleChangeVkLink = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsVkLinkError(false)
        setVkLink(e.target.value)
    }

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsEmailError(false)
        setEmail(e.target.value)
    }

    const handleChangeLegalName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLegalNameError(false)
        setLegalName(e.target.value)
    }

    const handleNotifications = () => {
        dispatch(handleChangeIsDisabledNotifications({
            isDisabled: !isDisabledNotifications
        }))
    }

    return (
        <StyledForm onSubmit={(e) => e.preventDefault()}>
            <BaseInput
                value={name}
                label="Название клуба"
                handleInput={handleChangeName}
                inputMode="text"
                type="text"
                isError={isErrorName}
                errorMessage="Недопускается использование системных символов"
            />

            <BaseInput
                value={vkLink}
                label="Ссылка на группу ВК"
                handleInput={handleChangeVkLink}
                inputMode="text"
                type="text"
                isError={isVkLinkError}
                errorMessage="Недопускается использование системных символов"
            />

            <BaseInput
                value={phone}
                label="Телефон"
                handleInput={(event) => setPhone(event.target.value)}
                inputMode="tel"
                type="phone"
            />

            <BaseInput
                value={email}
                label="E-Mail"
                handleInput={handleChangeEmail}
                inputMode="text"
                type="text"
                isError={isEmailError}
                errorMessage="Недопускается использование системных символов"
            />

            <BaseInput
                value={legalName}
                label="Юридическое название организации / ИП"
                handleInput={handleChangeLegalName}
                inputMode="text"
                type="text"
                isError={isLegalNameError}
                errorMessage="Недопускается использование системных символов"
            />

            <BaseInput
                value={itin}
                label="ИНН"
                handleInput={(event) => setItin(event.target.value)}
                inputMode="text"
                type="text"
            />

            <BaseSwitch
                checked={!isDisabledNotifications}
                handleChange={handleNotifications}
                label="Уведомления"
            />

            <TextButton
                text='Сохранить'
                onClick={handleSave}
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