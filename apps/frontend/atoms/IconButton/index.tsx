import React from "react"
import { Button } from "./styled"

type IconButton = {
    Icon: React.FC,
    onClick: () => void,
    backgroundColor?: string
    style?: React.CSSProperties,
}

export const IconButton: React.FC<IconButton> = ({ onClick, Icon, style }) => {
    return (
        <Button className="btn" onClick={onClick} style={{ ...style }}>
            <Icon />
        </Button>
    )
}