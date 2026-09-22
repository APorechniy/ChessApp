import React, { useState } from "react";
import { useRouter } from "next/router"
import { Avatar, ClubName, ExpandedBlock, HeaderMenuBlock, HeaderMenuWrapper, HeaderNavPanel, MainHeaderBlock, NavigationExit, NavigationItem, NavigationItemText, NavigationLink, PageName, ProfileBlock, ProfileHeader, Role, SettingsLink, TitlesBlock, Username } from "./styled";
import { MainLogo } from "../../../../assets/MainLogo";
import { TextButton } from "../../../TextButton";
import { SIDEBAR_ITEMS } from "../../../../content/sidebar-items";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { EXPANDED_MENU_ITEMS } from "../../../../content/expanded-menu";
import { handleExit } from "../../../../utils/handle-exit";
import { ExitIcon } from "../../../../assets/ExitIcon";
import { type UserRole } from "../../../../store/users/types";

const ROLES: Record<UserRole, string> = {
    "admin": "Администратор",
    "student": "Студент",
    "coach": "Тренер",
    "parent": "Родитель"
}

export const Header = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    const { currentUser } = useAppSelector(({ users }) => users)
    const { currentPageName, settings } = useAppSelector(({ system }) => system)

    const dispatch = useAppDispatch()

    const handleMenu = () => setIsOpenMenu(!isOpenMenu)

    const navigation = useRouter();

    const handleNavigate = ({ event, url }) => {
        event.preventDefault();

        navigation.push(url)
    }

    return (
        <MainHeaderBlock>
            <HeaderMenuWrapper>
                <HeaderMenuBlock>
                    <MainLogo width={130} />
                    <TextButton
                        text={'Меню'}
                        style={{
                            width: 'auto',
                            height: '4rem',
                            paddingTop: '0',
                            paddingBottom: '0',
                            paddingLeft: '2rem',
                            paddingRight: '2rem',
                            lineHeight: '1.2rem',
                            fontSize: '1.4rem',
                        }}
                        onClick={handleMenu}
                    />
                </HeaderMenuBlock>

                <ExpandedBlock
                    $isOpen={isOpenMenu}
                >
                    {
                        <>
                            {SIDEBAR_ITEMS.filter(i => i.accessedRoles.includes(currentUser.role)).map(item => (
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
                            ))}
                            <ProfileBlock>
                                <ProfileHeader>
                                    <Avatar />
                                    <TitlesBlock>
                                        <Username>
                                            {currentUser?.username}
                                        </Username>
                                        <Role>
                                            {currentUser?.role ? ROLES[currentUser.role] : ""}
                                        </Role>
                                    </TitlesBlock>
                                </ProfileHeader>
                                {
                                    EXPANDED_MENU_ITEMS.map(({ id, Icon, label, href, accessedRoles }) => (
                                        accessedRoles.includes(currentUser.role) &&
                                        <SettingsLink key={id} href={href} onClick={(event) => handleNavigate({ event: event, url: href })}>
                                            <Icon />
                                            {label}
                                        </SettingsLink>
                                    ))
                                }
                            </ProfileBlock>
                        </>
                    }
                    <NavigationExit onClick={() => handleExit(dispatch)}>
                        <ExitIcon />
                        <NavigationItemText>
                            Выход
                        </NavigationItemText>
                    </NavigationExit>
                </ExpandedBlock>
            </HeaderMenuWrapper>

            <HeaderNavPanel>
                <ClubName>
                    {settings?.name || "-"}
                </ClubName>
                <PageName>
                    {currentPageName}
                </PageName>
            </HeaderNavPanel>
        </MainHeaderBlock>
    )
}