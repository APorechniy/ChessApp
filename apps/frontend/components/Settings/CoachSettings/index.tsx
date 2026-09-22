import React, { useEffect } from "react";
import { Wrapper } from "./styled";
import { createTheme } from 'react-data-table-component';
import { COLUMNS } from "../../../content/coaches-settings-columns";
import { useAppSelector, useAppDispatch } from "../../../store/store";
import { handleOpenModal } from "../../../store/system";
import { StyledTable } from "../../../atoms/StyledTable";
import { getCoachesList } from "../../../store/users/thunk/get-coaches-list";
import { Header } from "./Header";
import { type CoachUser } from "../../../store/users/types";
import { handleChangeEditableCoach, handleClearIsRemovedCoach, handleClearIsUpdateCoachData } from "../../../store/users";

export const CoachSettings = () => {
    const { coachesList, isLoadingCoachesList } = useAppSelector(({ users }) => users)

    createTheme('dark', {
        text: {
            primary: 'var(--primary-text)'
        },
        background: {
            default: 'var(--primary-background)'
        }
    })

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCoachesList())
    }, [dispatch])

    const handleOpenDetailCoachModal = (coach: CoachUser) => {
        dispatch(handleChangeEditableCoach({
            coach: coach
        }))
        dispatch(handleClearIsRemovedCoach())
        dispatch(handleClearIsUpdateCoachData())
        dispatch(handleOpenModal({
            modalContent: "DETAIL_COACH"
        }))
    }

    return (
        <Wrapper>
            <Header />
            {
                isLoadingCoachesList === 'SUCCESS' &&
                <StyledTable
                    columns={COLUMNS}
                    // TODO: Перенести логику с удаленными тренерами на бэк
                    data={coachesList.filter(c => !c.userData.isFired)}
                    theme="dark"
                    onRowClicked={handleOpenDetailCoachModal}
                />
            }
        </Wrapper>
    )
}