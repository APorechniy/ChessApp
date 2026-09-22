import { createSlice } from '@reduxjs/toolkit'
import { type StudentsAttendedState } from './types'
import { CLEAR_STORE } from '../const'
import { getStudentsAttended } from './thunk/get-students-attended'

const initialState: StudentsAttendedState = {
    studentsAttended: [],

    isLoadingStudentsAttended: "IDLE",
}

export const studentsAttendedSlice = createSlice({
    name: 'students-attended',
    initialState,
    reducers: {
        handleClearStudentsAttended(state) {
            state.studentsAttended = []
            state.isLoadingStudentsAttended = "IDLE"
        },
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);
        // get-students-attended
        builder.addCase(getStudentsAttended.fulfilled, (state, action) => {
            state.studentsAttended = action.payload.studentsAttended ? action.payload.studentsAttended : [];
            state.isLoadingStudentsAttended = "SUCCESS";
        });
        builder.addCase(getStudentsAttended.pending, (state) => {
            state.isLoadingStudentsAttended = "PENDING";
        });
        builder.addCase(getStudentsAttended.rejected, (state) => {
            state.isLoadingStudentsAttended = "ERROR";
            state.studentsAttended = [];
        });
    }
})

export const {
    handleClearStudentsAttended
} = studentsAttendedSlice.actions

export default studentsAttendedSlice.reducer