import React, { ReactNode } from 'react'
import { ContentBlock, Layout } from './styled'
import { Header } from '../Header'

type Props = {
    contentStyles?: React.CSSProperties,
    children?: ReactNode;
}

export const Content: React.FC<Props> = (props) => {
    return (
        <Layout>
            <Header />
            <ContentBlock style={{ ...props.contentStyles }}>
                {props.children}
            </ContentBlock>
        </Layout>
    )
}