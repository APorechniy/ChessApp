import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/store"
import { useEffect } from "react"
import { createTheme } from 'react-data-table-component';
import { COLUMNS } from "../../content/learning-topics-table-columns";
import { TableWrapper } from "./styled";
import { StyledTable } from "../../atoms/StyledTable";
import { getLearningTopics } from "../../store/learning-topics/thunk/get-learning-topics";
import { type LearningTopics } from "../../store/learning-topics/types";
import { handleChangeSelectedLearningTopic, handleClearUpdateLearningTopic, handleClearRemoveLearningTopic } from "../../store/learning-topics";
import { handleOpenModal } from "../../store/system";
import { Header } from "./Header";

export const LearningTopicsTable = () => {
    const { learningTopicsList, isLoadingLearningTopics } = useAppSelector(({ learningTopics }) => learningTopics);

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
        dispatch(getLearningTopics())
    }, [dispatch])

    const handleOpenDetailTaskModal = (learningTopic: LearningTopics) => {
        dispatch(handleChangeSelectedLearningTopic({
            learningTopic: learningTopic
        }))
        dispatch(handleClearUpdateLearningTopic())
        dispatch(handleClearRemoveLearningTopic())
        dispatch(handleOpenModal({
            modalContent: "DETAIL_LEARNING_TOPIC"
        }))
    }

    return (
        <TableWrapper>
            <Header />
            {
                isLoadingLearningTopics === 'SUCCESS' &&
                <StyledTable
                    columns={COLUMNS}
                    data={learningTopicsList}
                    theme="dark"
                    onRowClicked={handleOpenDetailTaskModal}
                />
            }
        </TableWrapper>
    )
}