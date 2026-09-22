import { createSlice } from '@reduxjs/toolkit'
import { type StudentsGroup, type StudentsGroupsState } from './types'
import { CLEAR_STORE } from '../const'
import { getStudentsGroups } from './thunk/get-students-groups'
import { createStudentsGroup } from './thunk/create-students-group'
import { updateStudentsGroup } from './thunk/update-students-group'
import type { PayloadAction } from '@reduxjs/toolkit'
import { deleteStudentsGroup } from './thunk/delete-students-group'

const initialState: StudentsGroupsState = {
    studentsGroups: [],

    selectedStudentsGroup: null,

    isLoadingStudentsGroups: "IDLE",
    isCreatedStudentsGroup: "IDLE",
    isUpdatedStudentsGroup: "IDLE",
    isDeletedStudentsGroup: "IDLE",
}

export const studentsGroupsSlice = createSlice({
    name: 'students-groups',
    initialState,
    reducers: {
        handleClearStudentsGroups(state) {
            state.studentsGroups = []
            state.isLoadingStudentsGroups = "IDLE"
        },
        handleClearIsCreatedStudentsGroup(state) {
            state.isCreatedStudentsGroup = "IDLE"
        },
        handleClearIsUpdatedStudentsGroup(state) {
            state.isUpdatedStudentsGroup = "IDLE"
        },
        handleClearIsDeletedStudentsGroup(state) {
            state.isDeletedStudentsGroup = "IDLE"
        },
        handleChangeSelectedStudentsGroup(state, action: PayloadAction<{ studentsGroup: StudentsGroup | null }>) {
            state.selectedStudentsGroup = action.payload.studentsGroup
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);
        // get-students-groups
        builder.addCase(getStudentsGroups.fulfilled, (state, action) => {
            state.studentsGroups = action.payload.studentsGroups ? action.payload.studentsGroups : [];
            state.isLoadingStudentsGroups = "SUCCESS";
        });
        builder.addCase(getStudentsGroups.pending, (state) => {
            state.isLoadingStudentsGroups = "PENDING";
        });
        builder.addCase(getStudentsGroups.rejected, (state) => {
            state.isLoadingStudentsGroups = "ERROR";
            state.studentsGroups = [];
        });

        // create-students-group
        builder.addCase(createStudentsGroup.fulfilled, (state, action) => {
            state.isCreatedStudentsGroup = action.payload.isCreatedStudentsGroup ? "SUCCESS" : "ERROR";
        });
        builder.addCase(createStudentsGroup.pending, (state) => {
            state.isCreatedStudentsGroup = "PENDING";
        });
        builder.addCase(createStudentsGroup.rejected, (state) => {
            state.isCreatedStudentsGroup = "ERROR";
        });

        // update-students-group
        builder.addCase(updateStudentsGroup.fulfilled, (state, action) => {
            state.isUpdatedStudentsGroup = action.payload.isUpdatedStudentsGroup ? "SUCCESS" : "ERROR";
        });
        builder.addCase(updateStudentsGroup.pending, (state) => {
            state.isUpdatedStudentsGroup = "PENDING";
        });
        builder.addCase(updateStudentsGroup.rejected, (state) => {
            state.isUpdatedStudentsGroup = "ERROR";
        });

        // delete-students-group
        builder.addCase(deleteStudentsGroup.fulfilled, (state, action) => {
            state.isDeletedStudentsGroup = action.payload.isDeletedStudentsGroup ? "SUCCESS" : "ERROR";
        });
        builder.addCase(deleteStudentsGroup.pending, (state) => {
            state.isDeletedStudentsGroup = "PENDING";
        });
        builder.addCase(deleteStudentsGroup.rejected, (state) => {
            state.isDeletedStudentsGroup = "ERROR";
        });
    }
})

export const {
    handleClearStudentsGroups,
    handleClearIsCreatedStudentsGroup,
    handleClearIsUpdatedStudentsGroup,
    handleChangeSelectedStudentsGroup,
    handleClearIsDeletedStudentsGroup
} = studentsGroupsSlice.actions

export default studentsGroupsSlice.reducer