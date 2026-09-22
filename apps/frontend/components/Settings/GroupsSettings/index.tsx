import React, { useEffect } from "react";
import { Wrapper } from "./styled";
import { createTheme } from 'react-data-table-component';
import { COLUMNS } from "../../../content/students-groups-columns";
import { useAppSelector, useAppDispatch } from "../../../store/store";
import { handleOpenModal } from "../../../store/system";
import { StyledTable } from "../../../atoms/StyledTable";

import { getStudentsGroups } from "../../../store/students-groups/thunk/get-students-groups";
import { Header } from "./Header";
import { handleChangeSelectedStudentsGroup, handleClearIsDeletedStudentsGroup, handleClearIsUpdatedStudentsGroup } from "../../../store/students-groups";
import { type StudentsGroup } from "../../../store/students-groups/types";

export const GroupsSettings = () => {
    const { studentsGroups, isLoadingStudentsGroups } = useAppSelector(({ studentsGroups }) => studentsGroups)

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
        dispatch(getStudentsGroups())
    }, [dispatch])

    const handleOpenDetailGroupModal = (studentsGroup: StudentsGroup) => {
        dispatch(handleChangeSelectedStudentsGroup({
            studentsGroup: studentsGroup
        }))
        dispatch(handleClearIsUpdatedStudentsGroup())
        dispatch(handleClearIsDeletedStudentsGroup())
        dispatch(handleOpenModal({
            modalContent: "DETAIL_GROUP"
        }))
    }

    return (
        <Wrapper>
            <Header />
            {
                isLoadingStudentsGroups === 'SUCCESS' &&
                <StyledTable
                    columns={COLUMNS}
                    data={studentsGroups}
                    theme="dark"
                    onRowClicked={handleOpenDetailGroupModal}
                />
            }
        </Wrapper>
    )
}