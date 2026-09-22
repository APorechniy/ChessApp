import React, { useState, useEffect } from 'react'
import { FormWrapper, StudentItem, LeftStudentBlock, Name, InnerBlocks, ReportBlock, LinkBlock, LinkText } from "../styled";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { Excel } from "../../../assets/Excel";
import { handleClearReports } from "../../../store/reports";

import { Loader } from "../../../atoms/Loader";
import { TextButton } from "../../../atoms/TextButton";
import { getCoachesList } from '../../../store/users/thunk/get-coaches-list';
import { type CoachUser } from '../../../store/users/types';
import { createCoachReport } from '../../../store/reports/thunk/create-coach-report';

export const CoachesForm = () => {
    const [selectedCoach, setSelectedCoach] = useState<CoachUser>()

    const { coachesList, isLoadingCoachesList } = useAppSelector(({ users }) => users)
    const { currentReport, isLoadingReport } = useAppSelector(({ reports }) => reports)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCoachesList())

        return () => {
            dispatch(handleClearReports())
        }
    }, [])

    const handleChangeCoach = (coach: CoachUser) => {
        dispatch(handleClearReports())

        if (coach) {
            setSelectedCoach(coach)
        } else {
            setSelectedCoach(coachesList[0])
        }
    }

    const handleCreateReport = () => {
        if (selectedCoach) {
            dispatch(createCoachReport({
                coachId: selectedCoach.id
            }))
        }
    }

    const handleNewReport = () => {
        dispatch(handleClearReports())
    }

    return (
        <InnerBlocks>
            <FormWrapper>
                {
                    (isLoadingCoachesList === "IDLE" || isLoadingCoachesList === "PENDING")
                        ?
                        <Loader />
                        :
                        coachesList?.map((c) => (
                            <StudentItem key={c.id} onClick={() => handleChangeCoach(c)} isSelected={selectedCoach?.id === c.id}>
                                <LeftStudentBlock>
                                    <Name>{`${c.userData.lastName} ${c.userData.firstName}`}</Name>
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
                            text={'Выбрать тренера'}
                            style={{ marginTop: "2rem", height: "4rem", width: "auto", padding: '1rem' }}
                            onClick={handleNewReport}
                        />
                        :
                        <TextButton
                            disabled={!selectedCoach}
                            text={'Сформировать отчет'}
                            style={{ marginTop: "2rem", height: "4rem", width: "auto", padding: '1rem' }}
                            onClick={handleCreateReport}
                        />
                }
            </ReportBlock>
        </InnerBlocks>
    )
}