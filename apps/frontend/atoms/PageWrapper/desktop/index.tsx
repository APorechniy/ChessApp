import React, { ReactNode } from "react";
import { Wrapper } from "./styled";
import { Sidebar } from "./Sidebar";
import { Content } from "./Content";

type Props = {
    contentStyles?: React.CSSProperties,
    children?: ReactNode;
}

export const DesktopLayout: React.FC<Props> = (props) => {
    return (
        <Wrapper>
            <Sidebar />
            <Content {...props} />
        </Wrapper>
    )
}