import React, { useState, useRef } from "react";
import { ActiveArrow, Avatar, ClubIcon, ClubName, ExpandedMenu, ExpandedMenuItem, HeaderBlock, LeftBlock, PageName, RightBlock, Role, TitlesBlock, Username } from "./styled";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { ChevronDown } from "../../../../assets/ChevronDown";
import { handleHideOverlay, handleShowOverlay } from "../../../../store/system";
import { EXPANDED_MENU_ITEMS } from "../../../../content/expanded-menu";
import { useRouter } from "next/router"
import { useClickOutside } from "../../../../hooks/use-click-outside";
import { type UserRole } from "../../../../store/users/types";

const ROLES: Record<UserRole, string> = {
    "admin": "Администратор",
    "student": "Студент",
    "coach": "Тренер",
    "parent": "Родитель"
}

export const Header = () => {
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
    const expandedMenuRef = useRef(null)

    const { currentUser } = useAppSelector(({ users }) => users)
    const { currentPageName, settings } = useAppSelector(({ system }) => system)

    const dispatch = useAppDispatch();

    const navigation = useRouter();

    useClickOutside(expandedMenuRef, () => {
        setIsOpenMenu(false)
        handleCloseOverlay()
    })

    const handleClickMenu = () => {
        const newState = !isOpenMenu
        setIsOpenMenu(newState)

        if (newState) {
            dispatch(handleShowOverlay())
        } else {
            handleCloseOverlay()
        }
    }

    const handleCloseOverlay = () => dispatch(handleHideOverlay())

    const handleNavigate = ({ event, url }) => {
        event.preventDefault();

        navigation.push(url)
    }

    return (
        <HeaderBlock>
            <LeftBlock>
                <ClubIcon />

                <TitlesBlock>
                    <ClubName>
                        {settings?.name || "-"}
                    </ClubName>
                    <PageName>
                        {currentPageName}
                    </PageName>
                </TitlesBlock>
            </LeftBlock>

            <RightBlock>
                <Avatar />
                <TitlesBlock>
                    <Username>
                        {currentUser.username}
                    </Username>
                    <Role>
                        {ROLES[currentUser.role]}
                    </Role>
                </TitlesBlock>
                <ActiveArrow onClick={handleClickMenu} isRotate={isOpenMenu}>
                    <ChevronDown />
                </ActiveArrow>

                {
                    isOpenMenu &&
                    <ExpandedMenu onClick={handleCloseOverlay} ref={expandedMenuRef}>
                        {
                            EXPANDED_MENU_ITEMS.map(({ id, Icon, label, href, accessedRoles }) => (
                                accessedRoles.includes(currentUser.role) &&
                                <ExpandedMenuItem key={id} href={href} onClick={(event) => handleNavigate({ event: event, url: href })}>
                                    <Icon />
                                    {label}
                                </ExpandedMenuItem>
                            ))
                        }
                    </ExpandedMenu>
                }
            </RightBlock>
        </HeaderBlock>
    )
}