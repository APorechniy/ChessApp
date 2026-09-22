import React from 'react'
import { LogoWrapper, NavigationExit, NavigationItem, NavigationItemText, NavigationLink, NavigationWrapper, Panel } from './styled'
import { MainLogo } from '../../../../assets/MainLogo'
import { SIDEBAR_ITEMS } from '../../../../content/sidebar-items'
import { ExitIcon } from '../../../../assets/ExitIcon'
import { useAppDispatch, useAppSelector } from '../../../../store/store'
import { handleExit } from '../../../../utils/handle-exit'
import { useRouter } from 'next/navigation'

export const Sidebar = () => {
    const { currentUser } = useAppSelector(({ users }) => users)
    const dispatch = useAppDispatch()

    const navigation = useRouter();

    const handleNavigate = ({ event, url }) => {
        event.preventDefault();

        navigation.push(url)
    }

    return (
        <Panel>
            <LogoWrapper>
                <MainLogo />
            </LogoWrapper>
            <NavigationWrapper>
                {
                    SIDEBAR_ITEMS.filter(i => i.accessedRoles.includes(currentUser.role)).map(item => (
                        <NavigationLink key={item.id} href={item.link} onClick={(event) => handleNavigate({ event: event, url: item.link })}>
                            <NavigationItem>
                                {
                                    item?.icon && <item.icon />
                                }
                                <NavigationItemText>
                                    {item.name}
                                </NavigationItemText>
                            </NavigationItem>
                        </NavigationLink>
                    ))
                }

                <NavigationExit onClick={() => handleExit(dispatch)}>
                    <ExitIcon />
                    <NavigationItemText>
                        Выход
                    </NavigationItemText>
                </NavigationExit>
            </NavigationWrapper>
        </Panel>
    )
}