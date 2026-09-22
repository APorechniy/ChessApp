import { createSlice } from '@reduxjs/toolkit'
import { type TasksState } from './types'
import { getFilteredTasks, getTasks } from './thunk/get-tasks'
import { createTask } from './thunk/create-task'
import { CLEAR_STORE } from '../const'
import { updateTask } from './thunk/update-task'
import { removeTask } from './thunk/remove-task'
import { getEditableTask } from './thunk/get-editable-task'

const initialState: TasksState = {
    tasksList: [],
    filteredTasksList: [],
    selectedTask: null,

    editableTask: null,

    isLoadingTasks: "IDLE",
    isLoadingFilteredTasks: "IDLE",
    isCreatedTask: "IDLE",
    isUpdatedTask: "IDLE",
    isRemovedTask: "IDLE",

    isLoadingEditableTask: "IDLE",
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        handleClearTasksList(state) {
            state.isLoadingTasks = "IDLE";
            state.tasksList = [];
        },
        handleClearFilteredTasksList(state) {
            state.isLoadingFilteredTasks = "IDLE";
            state.filteredTasksList = [];
        },
        handleClearCreatedTaskStatus(state) {
            state.isCreatedTask = "IDLE"
        },
        handleClearRemovedTaskStatus(state) {
            state.isRemovedTask = "IDLE"
        },
        handleChangeSelectedTask(state, action) {
            state.selectedTask = action.payload.selectedTask;
        },
        handleClearIsUpdatedTask(state) {
            state.isUpdatedTask = "IDLE"
        },
        handleClearEditableTask(state) {
            state.editableTask = null
            state.isLoadingEditableTask = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);
        // get-tasks
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.tasksList = action.payload.tasksList;
            state.isLoadingTasks = "SUCCESS";
        });
        builder.addCase(getTasks.pending, (state) => {
            state.isLoadingTasks = "PENDING";
        });
        builder.addCase(getTasks.rejected, (state) => {
            state.isLoadingTasks = "ERROR";
            state.tasksList = [];
        });

        // get-editable-task
        builder.addCase(getEditableTask.fulfilled, (state, action) => {
            state.editableTask = action.payload.task;
            state.isLoadingEditableTask = "SUCCESS";
        });
        builder.addCase(getEditableTask.pending, (state) => {
            state.isLoadingEditableTask = "PENDING";
        });
        builder.addCase(getEditableTask.rejected, (state) => {
            state.isLoadingEditableTask = "ERROR";
            state.editableTask = null;
        });

        // get-filtered-tasks
        builder.addCase(getFilteredTasks.fulfilled, (state, action) => {
            state.filteredTasksList = action.payload.tasksList;
            state.isLoadingFilteredTasks = "SUCCESS";
        });
        builder.addCase(getFilteredTasks.pending, (state) => {
            state.isLoadingFilteredTasks = "PENDING";
        });
        builder.addCase(getFilteredTasks.rejected, (state) => {
            state.isLoadingFilteredTasks = "ERROR";
            state.filteredTasksList = [];
        });
        // create-task
        builder.addCase(createTask.fulfilled, (state, action) => {
            state.isCreatedTask = action.payload.isCreatedTask ? "SUCCESS" : "ERROR";
        });
        builder.addCase(createTask.pending, (state) => {
            state.isCreatedTask = "PENDING";
        });
        builder.addCase(createTask.rejected, (state) => {
            state.isCreatedTask = "ERROR";
        });

        // update-task
        builder.addCase(updateTask.fulfilled, (state, action) => {
            state.isUpdatedTask = action.payload.isUpdatedTask ? "SUCCESS" : "ERROR";
        });
        builder.addCase(updateTask.pending, (state) => {
            state.isCreatedTask = "PENDING";
        });
        builder.addCase(updateTask.rejected, (state) => {
            state.isCreatedTask = "ERROR";
        });

        // remove-task
        builder.addCase(removeTask.fulfilled, (state, action) => {
            state.isRemovedTask = action.payload.isRemovedTask ? "SUCCESS" : "ERROR";
        });
        builder.addCase(removeTask.pending, (state) => {
            state.isCreatedTask = "PENDING";
        });
        builder.addCase(removeTask.rejected, (state) => {
            state.isCreatedTask = "ERROR";
        });
    }
})

export const {
    handleClearTasksList,
    handleClearFilteredTasksList,
    handleClearCreatedTaskStatus,
    handleChangeSelectedTask,
    handleClearIsUpdatedTask,
    handleClearRemovedTaskStatus,
    handleClearEditableTask
} = tasksSlice.actions

export default tasksSlice.reducer