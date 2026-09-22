import React from 'react';
import { Input, InputContainer, InputError, InputLabel } from './styled';

type BaseInputProps = {
    value: string | number | null,
    placeholder?: string,
    handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
    label?: string,
    isDisabled?: boolean,
    required?: boolean,
    isError?: boolean,
    errorMessage?: string,
    isMasked?: boolean,
    autocomplete?: string,
    id?: string,
    name?: string,
    type?: "none" | "email" | "phone" | "date" | "text" | "datetime-local" | "number" | "password" | "time",
    inputMode?: "none" | "search" | "text" | "tel" | "url" | "email" | "numeric" | "decimal",
    max?: string,
    min?: string,
    dataTestId?: string,
    containerDataTestId?: string,
}

export const BaseInput: React.FC<BaseInputProps> = ({
    value,
    placeholder,
    handleInput,
    required = false,
    label,
    isError = false,
    errorMessage,
    inputMode = "text",
    type = "text",
    id,
    name,
    isDisabled = false,
    autocomplete = '',
    isMasked = false,
    max,
    min,
    dataTestId,
    containerDataTestId
}) => {
    const handleChange = (event) => {
        if (type === "number") {
            const isMatch = new RegExp(/^\d+$/).test(event.target.value) || event.target.value === ""

            if (isMatch) {
                handleInput(event)
            } else {
                event.target.value = ""
            }
        } else {
            handleInput(event)
        }
    }
    // ДОДЕЛАТЬ NOTES и ВАЛИДАЦИЮ ИНПУТОВ
    return (
        <InputContainer data-test-id={containerDataTestId}>
            {
                label && <InputLabel htmlFor={id}>{`${label} ${required ? "*" : " "}`}</InputLabel>
            }
            <Input
                disabled={isDisabled}
                placeholder={placeholder}
                required={required}
                value={value ?? ""}
                id={id}
                name={name}
                autoComplete={autocomplete}
                onChange={handleChange}
                inputMode={inputMode}
                type={type !== "number" && type}
                max={(type === "date" || type === "datetime-local") && max}
                min={(type === "date" || type === "datetime-local") && min}
                data-test-id={dataTestId}
            />

            {(errorMessage && isError) &&
                <InputError>
                    {isError && errorMessage}
                </InputError>
            }
        </InputContainer>
    )
}