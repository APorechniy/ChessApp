import React, { ReactNode } from 'react'
import { BackButton, ContentBlock, Layout } from './styled'
import { Header } from '../Header'
import { useRouter } from 'next/router';
import { IconButton } from '../../../IconButton'
import { ArrowLeft } from '../../../../assets/ArrowLeft'
import { TextButton } from '../../../TextButton';

type Props = {
    contentStyles?: React.CSSProperties,
    children?: ReactNode;
    isBackButton?: boolean;
}

export const Content: React.FC<Props> = (props) => {
    const router = useRouter()

    const handleBack = () => router.back()

    return (
        <Layout>
            <Header />
            <ContentBlock style={{ ...props.contentStyles }}>
                {
                    props.isBackButton &&
                    <BackButton>
                        <TextButton
                            onClick={handleBack}
                            Icon={ArrowLeft}
                            text='Назад'
                            style={{
                                padding: "1rem"
                            }}
                        />
                    </BackButton>
                }
                {props.children}
            </ContentBlock>
        </Layout>
    )
}