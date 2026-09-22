import React, { AriaRole, CSSProperties, ReactNode } from "react"
import { Button, IconWrapper } from "./styled"

type TextButton = {
    text: string,
    onClick?: () => void,
    Icon?: (...props: any) => ReactNode,
    backgroundColor?: string,
    disabled?: boolean,
    style?: CSSProperties
    role?: AriaRole
    type?: "button" | "submit" | "reset"
    dataTestId?: string
}

export const TextButton: React.FC<TextButton> = ({
    backgroundColor,
    onClick,
    text,
    style,
    role,
    type,
    disabled = false,
    dataTestId,
    Icon
}) => {
    return (
        <Button
            backgroundColor={backgroundColor}
            onClick={onClick}
            style={style}
            role={role}
            type={type}
            disabled={disabled}
            data-test-id={dataTestId}
        >
            {Icon &&
                <IconWrapper>
                    <Icon />
                </IconWrapper>
            }
            {text}
        </Button>
    )
}