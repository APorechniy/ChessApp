import React, { ReactNode } from 'react'
import { Overlay, Page } from './styled'
import { usePlatform } from '../../hooks/use-platform'
import { DesktopLayout } from './desktop'
import { MobileLayout } from './mobile'
import { useAppSelector } from '../../store/store'

type Props = {
    contentStyles?: React.CSSProperties,
    children?: ReactNode;
}

export const PageWrapper: React.FC<Props> = (props) => {
    const { isOpenFirstLevelOverlay } = useAppSelector(({ system }) => system)
    const platform = usePlatform()

    const Layout = platform === "desktop" ? DesktopLayout : MobileLayout

    return (
        <Page>
            <Overlay $isShow={isOpenFirstLevelOverlay} />
            <Layout {...props} />
        </Page>
    )
}