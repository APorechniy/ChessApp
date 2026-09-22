import React, { useState } from "react";
import { Message, Wrapper, Icon } from "./styled";
import { Warning } from "../../assets/Warning";

type NotificationBanner = {
    type: "INFO" | "WARNING" | "ERROR",
    text: string,
    isShow: boolean,
    onClose?: () => void,
}

export const NotificationBanner: React.FC<NotificationBanner> = ({ isShow, text, onClose }) => {
    const [isOpen, setIsOpen] = useState(isShow)

    return (
        isShow &&
        <Wrapper>
            <Icon>
                <Warning />
            </Icon>

            <Message>{text}</Message>
        </Wrapper>
    )
}