import { createSlice } from '@reduxjs/toolkit'
import type { HomeworksState } from './types'
import { CLEAR_STORE } from '../const'
import { createHomework } from './thunk/create-homework'
import { getCurrentHomework } from './thunk/get-current-homework'
import { freezeHomework } from './thunk/freeze-homework'
import { deleteHomework } from './thunk/delete-homework'
import { updateHomework } from './thunk/update-homework'

const initialState: HomeworksState = {
    currentHomework: null,

    isLoadingHomework: "IDLE",
    isCreatedHomework: "IDLE",
    isFreezedHomework: "IDLE",
    isUpdatedHomework: "IDLE",
}

export const homeworksSlice = createSlice({
    name: 'homeworks',
    initialState,
    reducers: {
        handleClearCurrentHomework(state) {
            state.isLoadingHomework = "IDLE"
            state.currentHomework = null
        },
        handleClearIsCreatedHomework(state) {
            state.isCreatedHomework = "IDLE"
        },
        handleClearIsDeletedHomework(state) {
            state.isDeletedHomework = "IDLE"
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);

        // get-homework
        builder.addCase(getCurrentHomework.fulfilled, (state, action) => {
            state.currentHomework = action.payload.homework;
            state.isLoadingHomework = action.payload.homework ? "SUCCESS" : "ERROR";
        });
        builder.addCase(getCurrentHomework.pending, (state) => {
            state.isLoadingHomework = "PENDING";
        });
        builder.addCase(getCurrentHomework.rejected, (state) => {
            state.currentHomework = null;
            state.isLoadingHomework = "ERROR";
        });

        // create-homework
        builder.addCase(createHomework.fulfilled, (state, action) => {
            state.isCreatedHomework = action.payload.isCreatedHomework ? "SUCCESS" : "ERROR";
        });
        builder.addCase(createHomework.pending, (state) => {
            state.isCreatedHomework = "PENDING";
        });
        builder.addCase(createHomework.rejected, (state) => {
            state.isCreatedHomework = "ERROR";
        });

        // update-homework
        builder.addCase(updateHomework.fulfilled, (state, action) => {
            state.isUpdatedHomework = action.payload.isUpdatedHomework ? "SUCCESS" : "ERROR";
        });
        builder.addCase(updateHomework.pending, (state) => {
            state.isUpdatedHomework = "PENDING";
        });
        builder.addCase(updateHomework.rejected, (state) => {
            state.isUpdatedHomework = "ERROR";
        });

        // freeze-homework
        builder.addCase(freezeHomework.fulfilled, (state, action) => {
            state.isFreezedHomework = action.payload.isFreezeHomework ? "SUCCESS" : "ERROR";
        });
        builder.addCase(freezeHomework.pending, (state) => {
            state.isFreezedHomework = "PENDING";
        });
        builder.addCase(freezeHomework.rejected, (state) => {
            state.isFreezedHomework = "ERROR";
        });

        // delete-homework
        builder.addCase(deleteHomework.fulfilled, (state, action) => {
            state.isDeletedHomework = action.payload.isDeletedHomework ? "SUCCESS" : "ERROR";
        });
        builder.addCase(deleteHomework.pending, (state) => {
            state.isDeletedHomework = "PENDING";
        });
        builder.addCase(deleteHomework.rejected, (state) => {
            state.isDeletedHomework = "ERROR";
        });
    }
})

export const {
    handleClearCurrentHomework,
    handleClearIsCreatedHomework,
    handleClearIsDeletedHomework
} = homeworksSlice.actions

export default homeworksSlice.reducer