import React, { useEffect } from "react";
import { Wrapper } from "./styled";
import { createTheme } from 'react-data-table-component';
import { COLUMNS, EXTRA_ADMIN_COLUMNS } from "../../content/tasks-table-columns";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { handleOpenModal } from "../../store/system";
import { StyledTable } from "../../atoms/StyledTable";
import { getTasks } from "../../store/tasks/thunk/get-tasks";
import { type Task } from "../../store/tasks/types";
import { handleChangeSelectedTask, handleClearIsUpdatedTask, handleClearRemovedTaskStatus } from "../../store/tasks";
import { Header } from "./Header";

export const TasksTable = () => {
    const { tasksList, isLoadingTasks } = useAppSelector(({ tasks }) => tasks)
    const { currentUser } = useAppSelector(({ users }) => users)

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
        dispatch(getTasks({}))
    }, [dispatch])

    const handleOpenDetailTaskModal = (task: Task) => {
        // TODO: FEATURE-TOGGLE
        if (currentUser.role !== "student") {
            dispatch(handleChangeSelectedTask({ selectedTask: task }))
            dispatch(handleClearIsUpdatedTask())
            dispatch(handleClearRemovedTaskStatus())
            dispatch(handleOpenModal({
                modalContent: "DETAIL_TASK"
            }))
        }
    }

    const TABLE_COLUMNS = currentUser?.role === 'admin'
        ?
        [...COLUMNS, ...EXTRA_ADMIN_COLUMNS]
        :
        COLUMNS

    return (
        <Wrapper>
            {
                // TODO: FEATURE-TOGGLE
                currentUser.role !== "student" && <Header />
            }
            {
                isLoadingTasks === 'SUCCESS' &&
                <StyledTable
                    mainColor="#fffaf4"
                    textColor="#FF9F24"
                    columns={TABLE_COLUMNS}
                    data={tasksList || []}
                    theme="dark"
                    onRowClicked={handleOpenDetailTaskModal}
                />
            }
        </Wrapper>
    )
}