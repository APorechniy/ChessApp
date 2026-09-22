import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type AttendancePreset, type AttendancePresetsState } from './types'
import { CLEAR_STORE } from '../const'
import { getAttendancePresets } from './thunk/get-attendance-presets'
import { createAttendancePreset } from './thunk/create-attendance-preset'
import { excludeDateFromPreset } from './thunk/exclude-date'
import { updateAttendancePreset } from './thunk/update-attendance-preset'
import { deleteAttendancePreset } from './thunk/delete-attendance-preset'

const initialState: AttendancePresetsState = {
    attendancePresetsList: [],

    currentAttendancePreset: null,

    attendancePresetsListLoading: "IDLE",
    isCreatedAttendancePreset: "IDLE",
    isUpdatedAttendancePreset: "IDLE",
    isDeletedAttendancePreset: "IDLE",
    isExcludedDate: "IDLE",
}

export const attendancePresetsSlice = createSlice({
    name: 'attendance-presets',
    initialState,
    reducers: {
        handleClearIsCreatedPreset(state) {
            state.isCreatedAttendancePreset = "IDLE"
        },
        handleClearIsUpdatedPreset(state) {
            state.isUpdatedAttendancePreset = "IDLE"
        },
        handleClearIsDeletedPreset(state) {
            state.isDeletedAttendancePreset = "IDLE"
        },
        handleChangeCurrentAttendancePreset(state, action: PayloadAction<{ attendancePreset: AttendancePreset }>) {
            state.currentAttendancePreset = action.payload.attendancePreset;
        },
        handleClearCurrentAttendancePreset(state) {
            state.currentAttendancePreset = null
        },
        handleClearIsExcludedDate(state) {
            state.isExcludedDate = "IDLE"
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);
        // get-attendance-presets
        builder.addCase(getAttendancePresets.fulfilled, (state, action) => {
            state.attendancePresetsList = action.payload.attendancePresetsList;
            state.attendancePresetsListLoading = "SUCCESS";
        });
        builder.addCase(getAttendancePresets.pending, (state) => {
            state.attendancePresetsListLoading = "PENDING";
        });
        builder.addCase(getAttendancePresets.rejected, (state) => {
            state.attendancePresetsListLoading = "ERROR";
            state.attendancePresetsList = [];
        });

        // create-attendance-preset
        builder.addCase(createAttendancePreset.fulfilled, (state, action) => {
            state.isCreatedAttendancePreset = action.payload.created ? "SUCCESS" : "ERROR";
        });
        builder.addCase(createAttendancePreset.pending, (state) => {
            state.isCreatedAttendancePreset = "PENDING";
        });
        builder.addCase(createAttendancePreset.rejected, (state) => {
            state.isCreatedAttendancePreset = "ERROR";
        });

        // update-attendance-preset
        builder.addCase(updateAttendancePreset.fulfilled, (state, action) => {
            state.isUpdatedAttendancePreset = action.payload.isUpdated ? "SUCCESS" : "ERROR";
        });
        builder.addCase(updateAttendancePreset.pending, (state) => {
            state.isUpdatedAttendancePreset = "PENDING";
        });
        builder.addCase(updateAttendancePreset.rejected, (state) => {
            state.isUpdatedAttendancePreset = "ERROR";
        });

        // delete-attendance-preset
        builder.addCase(deleteAttendancePreset.fulfilled, (state, action) => {
            state.isDeletedAttendancePreset = action.payload.isDeleted ? "SUCCESS" : "ERROR";
        });
        builder.addCase(deleteAttendancePreset.pending, (state) => {
            state.isDeletedAttendancePreset = "PENDING";
        });
        builder.addCase(deleteAttendancePreset.rejected, (state) => {
            state.isDeletedAttendancePreset = "ERROR";
        });

        // exclude-date
        builder.addCase(excludeDateFromPreset.fulfilled, (state, action) => {
            state.isExcludedDate = action.payload.isUpdated ? "SUCCESS" : "ERROR";
        });
        builder.addCase(excludeDateFromPreset.pending, (state) => {
            state.isExcludedDate = "PENDING";
        });
        builder.addCase(excludeDateFromPreset.rejected, (state) => {
            state.isExcludedDate = "ERROR";
        });
    }
})

export const {
    handleClearIsCreatedPreset,
    handleChangeCurrentAttendancePreset,
    handleClearCurrentAttendancePreset,
    handleClearIsExcludedDate,
    handleClearIsUpdatedPreset,
    handleClearIsDeletedPreset
} = attendancePresetsSlice.actions

export default attendancePresetsSlice.reducer