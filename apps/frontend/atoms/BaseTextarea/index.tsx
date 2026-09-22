import React, { type CSSProperties } from 'react';
import { Input, InputContainer, InputError, InputLabel } from './styled';

type BaseTextareaProps = {
    value: string | null,
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
    style?: CSSProperties,
    inputMode?: "none" | "search" | "text" | "tel" | "url" | "email" | "numeric" | "decimal",
}

export const BaseTextarea: React.FC<BaseTextareaProps> = ({
    value,
    placeholder,
    handleInput,
    required = false,
    label,
    isError = false,
    errorMessage,
    inputMode = "text",
    id,
    name,
    isDisabled = false,
    autocomplete = '',
    isMasked = false,
    style,
}) => {
    const handleChange = (event) => {
        handleInput(event)
    }
    // ДОДЕЛАТЬ NOTES и ВАЛИДАЦИЮ ИНПУТОВ
    return (
        <InputContainer style={style}>
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
            />

            {(errorMessage && isError) &&
                <InputError>
                    {isError && errorMessage}
                </InputError>
            }
        </InputContainer>
    )
}