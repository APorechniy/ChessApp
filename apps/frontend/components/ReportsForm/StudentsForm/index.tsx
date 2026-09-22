import React, { useState, useEffect } from 'react'
import { FormWrapper, StyledInputWrapper, StyledInput, StudentItem, LeftStudentBlock, Name, InnerBlocks, ReportBlock, LinkBlock, LinkText } from "../styled";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getAllStudents } from "../../../store/students/thunk/get-all-students";
import type { Student } from "../../../store/students/types";
import { createReport } from "../../../store/reports/thunk/create-report";
import { Excel } from "../../../assets/Excel";
import { handleClearReports } from "../../../store/reports";

import { SearchIcon } from "../../../assets/SearchIcon";
import { ClearIcon } from "../../../assets/ClearIcon";
import { Loader } from "../../../atoms/Loader";
import { TextButton } from "../../../atoms/TextButton";

export const StudentsForm = () => {
    const [searchString, setSearchString] = useState<string>()
    const [selectedStudent, setSelectedStudent] = useState<Student>()
    const [filteredStudentsList, setFilteredStudentsList] = useState<Student[]>()

    const { studentsList, studentsListLoading } = useAppSelector(({ students }) => students)
    const { currentReport, isLoadingReport } = useAppSelector(({ reports }) => reports)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllStudents())

        return () => {
            dispatch(handleClearReports())
        }
    }, [])

    useEffect(() => {
        if (studentsList) {
            setFilteredStudentsList(studentsList)
        }
    }, [studentsList])

    useEffect(() => {
        filterStudents(searchString)
    }, [searchString])

    const filterStudents = (str: string) => {
        if (str) {
            // [TODO]: Унести фильтрацию на бэк, переработать дизайн
            const newStudentsList = studentsList.filter((s) => s.firstName.toLowerCase().includes(str.toLowerCase()) || s.lastName.toLowerCase().includes(str.toLowerCase()))
            setFilteredStudentsList(newStudentsList)
        } else {
            setFilteredStudentsList([...studentsList])
        }
    }

    const handleChangeSearchString: React.ChangeEventHandler<HTMLInputElement> = (event) =>
        setSearchString(event.target.value)

    const handleClear = () => setSearchString('')

    const handleChangeStudent = (student: Student) => {
        dispatch(handleClearReports())

        if (student) {
            setSelectedStudent(student)
        } else {
            setSelectedStudent(studentsList[0])
        }
    }

    const handleCreateReport = () => {
        if (selectedStudent) {
            dispatch(createReport({
                studentId: selectedStudent.id
            }))
        }
    }

    const handleNewReport = () => {
        dispatch(handleClearReports())
    }

    return (
        <InnerBlocks>
            <FormWrapper>
                <StyledInputWrapper>
                    <SearchIcon />
                    <StyledInput
                        placeholder='Поиск...'
                        value={searchString}
                        onChange={handleChangeSearchString}
                    />
                    <ClearIcon
                        onClick={handleClear}
                    />
                </StyledInputWrapper>
                {
                    (studentsListLoading === "IDLE" || studentsListLoading === "PENDING")
                        ?
                        <Loader />
                        :
                        filteredStudentsList?.map((s) => (
                            <StudentItem key={s.id} onClick={() => handleChangeStudent(s)} isSelected={selectedStudent?.id === s.id}>
                                <LeftStudentBlock>
                                    <Name>{`${s.lastName} ${s.firstName}`}</Name>
                                </LeftStudentBlock>
                            </StudentItem>
                        ))

                }
            </FormWrapper>

            <ReportBlock>
                {
                    Boolean(isLoadingReport && currentReport && currentReport.reportFile && currentReport.reportFile.size && currentReport.reportFile.size !== 0 && currentReport.reportFileName) &&
                    <a href={URL.createObjectURL(currentReport?.reportFile)} download={currentReport.reportFileName}>
                        <LinkBlock>
                            <Excel />
                            <LinkText>{currentReport.reportFileName}</LinkText>
                        </LinkBlock>
                    </a>
                }
                {
                    isLoadingReport === 'SUCCESS'
                        ?
                        <TextButton
                            text={'Выбрать студента'}
                            style={{ marginTop: "2rem", height: "4rem", width: "auto", padding: '1rem' }}
                            onClick={handleNewReport}
                        />
                        :
                        <TextButton
                            disabled={!selectedStudent}
                            text={'Сформировать отчет'}
                            style={{ marginTop: "2rem", height: "4rem", width: "auto", padding: '1rem' }}
                            onClick={handleCreateReport}
                        />
                }
            </ReportBlock>
        </InnerBlocks>
    )
}