import React, { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { COLUMNS } from '../../content/learning-topics-table-columns';
import { TableWrapper } from './styled';
import { StyledTable } from '../../atoms/StyledTable';
import { getLearningTopics } from '../../store/learning-topics/thunk/get-learning-topics';
import type { LearningTopics } from '../../store/learning-topics/types';
import {
    handleChangeSelectedLearningTopic,
    handleClearUpdateLearningTopic,
    handleClearRemoveLearningTopic,
} from '../../store/learning-topics';
import { handleOpenModal } from '../../store/system';
import { Header } from './Header';
import { ExpandableTasks } from './ExpandableTasks';
import { getTasks } from '../../store/tasks/thunk/get-tasks';
import { handleClearTasksList } from '../../store/tasks';

export const LearningTopicsTable: React.FC = () => {
    const { learningTopicsList, isLoadingLearningTopics } = useAppSelector(
        ({ learningTopics }) => learningTopics
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getLearningTopics());
    }, [dispatch]);

    const handleOpenDetailTaskModal = useCallback(
        (learningTopic: LearningTopics): void => {
            dispatch(handleChangeSelectedLearningTopic({ learningTopic }));
            dispatch(handleClearUpdateLearningTopic());
            dispatch(handleClearRemoveLearningTopic());
            dispatch(handleOpenModal({ modalContent: 'DETAIL_LEARNING_TOPIC' }));
        },
        [dispatch]
    );

    const handleRowExpanded = useCallback(
        (expanded: boolean, row: LearningTopics): void => {
            if (expanded) {
                dispatch(getTasks({ learningTopicId: row.id }));
            } else {
                dispatch(handleClearTasksList());
            }
        },
        [dispatch]
    );

    return (
        <TableWrapper>
            <Header />
            {isLoadingLearningTopics === 'SUCCESS' && (
                <StyledTable<LearningTopics>
                    columns={COLUMNS}
                    data={learningTopicsList}
                    getRowId={(row: any) => String(row.id)}
                    expandableRows
                    expandableRowsComponent={ExpandableTasks}
                    onRowExpandToggled={handleRowExpanded}
                    onRowClicked={handleOpenDetailTaskModal}
                />
            )}
        </TableWrapper>
    );
};