import React, { ReactNode } from "react";
import { Content, Wrapper } from "./styled";
import { Header } from "./Header";

type Props = {
    contentStyles?: React.CSSProperties,
    children?: ReactNode;
}

export const MobileLayout: React.FC<Props> = (props) => {
    return (
        <Wrapper>
            <Header />
            <Content style={{ ...props.contentStyles }}>
                {props.children}
            </Content>
        </Wrapper>
    )
}