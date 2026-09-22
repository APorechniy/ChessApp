import { createSlice } from '@reduxjs/toolkit'
import { type StudentsState } from './types'
import { getAllStudents } from './thunk/get-all-students'
import { CLEAR_STORE } from '../const'
import { createStudent } from './thunk/create-student'
import { updateStudent } from './thunk/update-student'
import { removeStudent } from './thunk/remove-student'
import { getStudentStatistic } from './thunk/get-student-statistic'

const initialState: StudentsState = {
    studentsList: [],
    selectedStudent: null,

    studentStatistic: null,

    isCreatedStudent: "IDLE",
    isUpdatedStudent: "IDLE",
    isRemoveStudent: "IDLE",

    isLoadingStudentStatistic: "IDLE",
    studentsListLoading: "IDLE",
}

export const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        handleChangeIsCreatedStudent(state) {
            state.isCreatedStudent = "IDLE"
        },
        handleChangeSelectedStudent(state, action) {
            state.selectedStudent = action.payload.student;
        },
        handleClearIsUpdateStudent(state) {
            state.isUpdatedStudent = "IDLE"
        },
        handleClearIsRemoveStudent(state) {
            state.isRemoveStudent = "IDLE"
        },
        handleClearStudentStatistic(state) {
            state.studentStatistic = null
            state.isLoadingStudentStatistic = "IDLE"
        },
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);
        // get-all-students
        builder.addCase(getAllStudents.fulfilled, (state, action) => {
            state.studentsList = action.payload.studentsList;
            state.studentsListLoading = "SUCCESS";
        });
        builder.addCase(getAllStudents.pending, (state) => {
            state.studentsListLoading = "PENDING";
        });
        builder.addCase(getAllStudents.rejected, (state) => {
            state.studentsListLoading = "ERROR";
            state.studentsList = [];
        });

        // get-all-students
        builder.addCase(getStudentStatistic.fulfilled, (state, action) => {
            state.studentStatistic = action.payload.studentStatistic;
            state.isLoadingStudentStatistic = "SUCCESS";
        });
        builder.addCase(getStudentStatistic.pending, (state) => {
            state.isLoadingStudentStatistic = "PENDING";
        });
        builder.addCase(getStudentStatistic.rejected, (state) => {
            state.isLoadingStudentStatistic = "ERROR";
            state.studentStatistic = null;
        });

        // create-student
        builder.addCase(createStudent.fulfilled, (state, action) => {
            state.isCreatedStudent = action.payload.created ? "SUCCESS" : "ERROR";
        });
        builder.addCase(createStudent.pending, (state) => {
            state.isCreatedStudent = "PENDING";
        });
        builder.addCase(createStudent.rejected, (state) => {
            state.isCreatedStudent = "ERROR";
        });

        // update-student
        builder.addCase(updateStudent.fulfilled, (state, action) => {
            state.isUpdatedStudent = action.payload.isUpdatedStudent ? "SUCCESS" : "ERROR";
        });
        builder.addCase(updateStudent.pending, (state) => {
            state.isUpdatedStudent = "PENDING";
        });
        builder.addCase(updateStudent.rejected, (state) => {
            state.isUpdatedStudent = "ERROR";
        });

        // remove-student
        builder.addCase(removeStudent.fulfilled, (state, action) => {
            state.isRemoveStudent = action.payload.isRemoveStudent ? "SUCCESS" : "ERROR";
        });
        builder.addCase(removeStudent.pending, (state) => {
            state.isRemoveStudent = "PENDING";
        });
        builder.addCase(removeStudent.rejected, (state) => {
            state.isRemoveStudent = "ERROR";
        });
    }
})

export const {
    handleChangeIsCreatedStudent,
    handleChangeSelectedStudent,
    handleClearIsUpdateStudent,
    handleClearIsRemoveStudent,
    handleClearStudentStatistic
} = studentsSlice.actions

export default studentsSlice.reducer