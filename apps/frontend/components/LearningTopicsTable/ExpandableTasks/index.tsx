import React, { useCallback, useMemo } from 'react';
import { type Row } from '@tanstack/react-table';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import {
    handleChangeSelectedTask,
    handleClearIsUpdatedTask,
    handleClearRemovedTaskStatus,
} from '../../../store/tasks';
import { getTaskColumns } from '../../../content/tasks-table-columns';
import { type LearningTopics } from '../../../store/learning-topics/types';
import { type Task } from '../../../store/tasks/types';
import { type AppTableFeatures } from '../../../atoms/StyledTable/Features/features';
import { handleOpenModal } from '../../../store/system';
import { Loader } from '../../../atoms/Loader';
import { StyledTable } from '../../../atoms/StyledTable';
import { Wrapper } from './styled';

export interface ExpandableTasksProps {
    readonly data: LearningTopics;
    readonly row: Row<AppTableFeatures, LearningTopics>;
}

export const ExpandableTasks: React.FC<ExpandableTasksProps> = ({ data: topic }) => {
    const { tasksList, isLoadingTasks } = useAppSelector(({ tasks }) => tasks);

    const { currentUser } = useAppSelector(({ users }) => users)

    const isAdmin = currentUser?.role === 'admin';

    const dispatch = useAppDispatch();

    const columns = useMemo(() => getTaskColumns(Boolean(isAdmin)), [isAdmin]);

    const handleOpenDetailTaskModal = useCallback(
        (task: Task): void => {
            dispatch(handleChangeSelectedTask({ selectedTask: task }));
            dispatch(handleClearIsUpdatedTask());
            dispatch(handleClearRemovedTaskStatus());
            dispatch(
                handleOpenModal({
                    modalContent: 'DETAIL_TASK',
                })
            );
        },
        [dispatch]
    );

    return (
        <Wrapper key={topic.id}>
            {isLoadingTasks === 'SUCCESS' ? (
                <StyledTable<Task>
                    isNested
                    columns={columns}
                    data={tasksList}
                    getRowId={(task) => String(task.id)}
                    onRowClicked={handleOpenDetailTaskModal}
                />
            ) : (
                <Loader />
            )}
        </Wrapper>
    );
};