import React, { useEffect } from "react";
import { Header } from "./Header";
import { Wrapper } from "./styled";
import { createTheme } from 'react-data-table-component';
import { getColumns } from "../../content/students-table-columns";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { getAllStudents } from "../../store/students/thunk/get-all-students";
import { type Student } from "../../store/students/types";
import { handleChangeSelectedStudent, handleClearIsRemoveStudent, handleClearIsUpdateStudent } from "../../store/students";
import { handleOpenModal } from "../../store/system";
import { StyledTable } from "../../atoms/StyledTable";

export const StudentsTable = () => {
    const { currentUser } = useAppSelector(({ users }) => users)
    const { studentsList, studentsListLoading } = useAppSelector(({ students }) => students)

    createTheme('dark', {
        text: {
            primary: 'var(--primary-text)'
        },
        background: {
            default: 'var(--primary-background)'
        }
    })

    const dispatch = useAppDispatch()

    const COLUMNS = getColumns(currentUser.role === "admin")

    useEffect(() => {
        dispatch(getAllStudents())
    }, [dispatch])

    const handleOpenDetailStudentModal = (student: Student) => {
        dispatch(handleChangeSelectedStudent({
            student: student
        }))
        dispatch(handleClearIsRemoveStudent())
        dispatch(handleClearIsUpdateStudent())
        dispatch(handleOpenModal({
            modalContent: "DETAIL_STUDENT"
        }))
    }

    return (
        <Wrapper>
            <Header />
            {
                studentsListLoading === 'SUCCESS' &&
                <StyledTable
                    columns={COLUMNS}
                    data={studentsList}
                    theme="dark"
                    onRowClicked={handleOpenDetailStudentModal}
                />
            }
        </Wrapper>
    )
}