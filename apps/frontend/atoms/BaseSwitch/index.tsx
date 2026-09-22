import React from 'react';
import { Switch, SwitchContainer, SwitchLabel, SwitchError } from './styled';
import { CheckedIcon } from '../../assets/CheckedIcon';

type BaseSwitchProps = {
    checked: boolean,
    handleChange: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    label?: string,
    isDisabled?: boolean,
    required?: boolean,
    isError?: boolean,
    errorMessage?: string,
    style?: {
        container?: React.CSSProperties,
        switch?: React.CSSProperties,
        label?: React.CSSProperties,
    },
}

export const BaseSwitch: React.FC<BaseSwitchProps> = ({
    checked,
    handleChange,
    required = false,
    label,
    isError = false,
    errorMessage,
    isDisabled = false,
    style
}) => {
    return (
        <SwitchContainer style={style?.container}>
            <Switch
                $isDisabled={isDisabled}
                $isChecked={checked}
                onClick={handleChange}
                className="switch"
                style={style?.switch}
            >
                {Boolean(checked) && <CheckedIcon />}
            </Switch>
            <SwitchLabel style={style?.label}>{`${label ? `${label}  ${required ? "*" : " "}` : ""}`}</SwitchLabel>
            {
                isError &&
                <SwitchError>
                    {errorMessage}
                </SwitchError>
            }
        </SwitchContainer>
    )
}