import React, { useEffect, useState } from "react";

import { BaseInput } from "../../../atoms/BaseInput/Input";

import { StyledForm } from "./styled";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { TextButton } from "../../../atoms/TextButton";
import { type Settings } from "../../../store/system/types";
import { updateSettings } from "../../../store/system/thunk/update-settings";
import { getSettings } from "../../../store/system/thunk/get-settings";
import { handleClearIsUpdatedSettings } from "../../../store/system";

export const UkassaSettings = () => {
    const { settings, isUpdatedSettings } = useAppSelector(({ system }) => system);

    const [shopId, setShopId] = useState<string>(settings?.ukassaId)
    const [apiKey, setApiKey] = useState<string>()

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isUpdatedSettings === "SUCCESS" || isUpdatedSettings === "IDLE") {
            dispatch(getSettings())
        }

        return () => {
            dispatch(handleClearIsUpdatedSettings())
        }
    }, [isUpdatedSettings])

    const handleChangeShopId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShopId(e.target.value)
    }

    const handleChangeApiKey = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApiKey(e.target.value)
    }

    const handleSave = () => {
        const updatedSettings: Settings = {
            ...settings,
            ukassaId: shopId,
            ukassaApiKey: apiKey,
        }

        dispatch(updateSettings({ settings: updatedSettings }))
    }

    return (
        <StyledForm onSubmit={(e) => e.preventDefault()}>
            <BaseInput
                value={shopId}
                label="ID магазина"
                handleInput={handleChangeShopId}
                inputMode="text"
                type="text"
            />

            <BaseInput
                value={apiKey}
                label="API-токен"
                handleInput={handleChangeApiKey}
                inputMode="text"
                type="text"
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