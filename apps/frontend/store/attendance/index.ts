import { createSlice } from '@reduxjs/toolkit'
import { type AttendanceState } from './types'
import { CLEAR_STORE } from '../const'
import { createAttendance } from './thunk/create-attendance'
import { getAttendances } from './thunk/get-attendances'
import { updateAttendance } from './thunk/update-attendance'
import { updateAndFreezeAttendance } from './thunk/update-and-freeze-attendance'
import { removeAttendance } from './thunk/remove-attendance'
import { getNextAttendance } from './thunk/get-next-attendance'
import { getAttendancesForStudent } from './thunk/get-attendances-for-student'
import { getUnclosedAttendances } from './thunk/get-unclosed-attendances'
import { createAttendanceByPreset } from './thunk/create-attendance-by-preset'

const initialState: AttendanceState = {
    attendancesList: [],
    unclosedAttendancesList: [],
    studentAttendancesList: [],
    selectedDate: null,

    nextAttendance: null,

    selectedAttendance: null,
    isCreatedAttendance: "IDLE",
    isUpdatedAttendance: "IDLE",
    isRemovedAttendance: "IDLE",

    attendancesListLoading: "IDLE",
    unclosedAttendancesLoading: "IDLE",
    studentAttendancesListLoading: "IDLE",

    isLoadingNextAttendance: "IDLE",
}

export const attendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {
        handleClearNextAttendance(state) {
            state.nextAttendance = null;
            state.isLoadingNextAttendance = "IDLE"
        },
        handleChangeIsRemovedAttendance(state) {
            state.isRemovedAttendance = "IDLE"
        },
        handleChangeIsUpdatedAttendance(state) {
            state.isUpdatedAttendance = "IDLE"
        },
        handleChangeIsCreatedAttendance(state) {
            state.isCreatedAttendance = "IDLE"
        },
        handleChangeSelectedAttendance(state, action) {
            state.selectedAttendance = action.payload.selectedAttendance;
        },
        handleChangeSelectedDate(state, action) {
            state.selectedDate = action.payload.selectedDate;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);
        // get-attendances
        builder.addCase(getAttendances.fulfilled, (state, action) => {
            state.attendancesList = action.payload.attendancesList;
            state.attendancesListLoading = "SUCCESS";
        });
        builder.addCase(getAttendances.pending, (state) => {
            state.attendancesListLoading = "PENDING";
        });
        builder.addCase(getAttendances.rejected, (state) => {
            state.attendancesListLoading = "ERROR";
            state.attendancesList = [];
        });

        // get-unclosed-attendances
        builder.addCase(getUnclosedAttendances.fulfilled, (state, action) => {
            state.unclosedAttendancesList = action.payload.unclosedAttendancesList;
            state.unclosedAttendancesLoading = "SUCCESS";
        });
        builder.addCase(getUnclosedAttendances.pending, (state) => {
            state.unclosedAttendancesLoading = "PENDING";
        });
        builder.addCase(getUnclosedAttendances.rejected, (state) => {
            state.unclosedAttendancesLoading = "ERROR";
            state.unclosedAttendancesList = [];
        });

        // get-attendances-for-student
        builder.addCase(getAttendancesForStudent.fulfilled, (state, action) => {
            state.studentAttendancesList = action.payload.attendancesList;
            state.studentAttendancesListLoading = "SUCCESS";
        });
        builder.addCase(getAttendancesForStudent.pending, (state) => {
            state.studentAttendancesListLoading = "PENDING";
        });
        builder.addCase(getAttendancesForStudent.rejected, (state) => {
            state.studentAttendancesListLoading = "ERROR";
            state.studentAttendancesList = [];
        });

        // get-next-attendance
        builder.addCase(getNextAttendance.fulfilled, (state, action) => {
            state.nextAttendance = action.payload.nextAttendance;
            state.isLoadingNextAttendance = "SUCCESS";
        });
        builder.addCase(getNextAttendance.pending, (state) => {
            state.isLoadingNextAttendance = "PENDING";
        });
        builder.addCase(getNextAttendance.rejected, (state) => {
            state.isLoadingNextAttendance = "ERROR";
            state.nextAttendance = null;
        });

        // create-attendance
        builder.addCase(createAttendance.fulfilled, (state, action) => {
            state.isCreatedAttendance = action.payload.created ? "SUCCESS" : "ERROR";
        });
        builder.addCase(createAttendance.pending, (state) => {
            state.isCreatedAttendance = "PENDING";
        });
        builder.addCase(createAttendance.rejected, (state) => {
            state.isCreatedAttendance = "ERROR";
        });

        // create-attendance-by-preset
        builder.addCase(createAttendanceByPreset.fulfilled, (state, action) => {
            state.isCreatedAttendance = action.payload.created ? "SUCCESS" : "ERROR";
        });
        builder.addCase(createAttendanceByPreset.pending, (state) => {
            state.isCreatedAttendance = "PENDING";
        });
        builder.addCase(createAttendanceByPreset.rejected, (state) => {
            state.isCreatedAttendance = "ERROR";
        });

        // update-attendance
        builder.addCase(updateAttendance.fulfilled, (state, action) => {
            state.isUpdatedAttendance = action.payload.updated ? "SUCCESS" : "ERROR";
        });
        builder.addCase(updateAttendance.pending, (state) => {
            state.isUpdatedAttendance = "PENDING";
        });
        builder.addCase(updateAttendance.rejected, (state) => {
            state.isUpdatedAttendance = "ERROR";
        });

        // update-and-freeze-attendance
        builder.addCase(updateAndFreezeAttendance.fulfilled, (state, action) => {
            state.isUpdatedAttendance = action.payload.updated ? "SUCCESS" : "ERROR";
        });
        builder.addCase(updateAndFreezeAttendance.pending, (state) => {
            state.isUpdatedAttendance = "PENDING";
        });
        builder.addCase(updateAndFreezeAttendance.rejected, (state) => {
            state.isUpdatedAttendance = "ERROR";
        });

        // remove-attendance
        builder.addCase(removeAttendance.fulfilled, (state, action) => {
            state.isRemovedAttendance = action.payload.isRemovedAttendance ? "SUCCESS" : "ERROR";
        });
        builder.addCase(removeAttendance.pending, (state) => {
            state.isRemovedAttendance = "PENDING";
        });
        builder.addCase(removeAttendance.rejected, (state) => {
            state.isRemovedAttendance = "ERROR";
        });
    }
})

export const {
    handleChangeIsUpdatedAttendance,
    handleChangeIsCreatedAttendance,
    handleChangeSelectedAttendance,
    handleChangeIsRemovedAttendance,
    handleChangeSelectedDate,
    handleClearNextAttendance
} = attendanceSlice.actions

export default attendanceSlice.reducer