import { createSlice } from '@reduxjs/toolkit'
import type { HomeworksState } from './types'
import { CLEAR_STORE } from '../const'
import { createHomework } from './thunk/create-homework'
import { getCurrentHomework } from './thunk/get-current-homework'
import { deleteHomework } from './thunk/delete-homework'
import { updateHomework } from './thunk/update-homework'
import { getHomeworksList } from './thunk/get-homeworks-list'
import { getHomeworkSolutions } from './thunk/get-homework-solutions'
import { getHomeworksByStudentId } from './thunk/get-homeworks-by-student-id'
import { getCurrentSolution } from './thunk/get-current-solution'
import { getHomeworkTasks } from './thunk/get-homework-tasks'
import { updateHomeworkSolution } from './thunk/update-homework-solution'
import { getStudentAnswers } from './thunk/get-student-answers'

const initialState: HomeworksState = {
    homeworksList: [],
    homeworkSolutionsList: [],
    currentHomework: null,
    currentSolution: null,
    currentHomeworkTasks: [],
    studentAnswers: [],

    isLoadingHomeworkTasks: "IDLE",
    isLoadingHomeworkSolutions: "IDLE",
    isLoadingHomeworksList: "IDLE",
    isLoadingCurrentSolution: "IDLE",
    isLoadingHomework: "IDLE",
    isLoadingStudentAnswers: "IDLE",
    isCreatedSolutionAnswer: "IDLE",
    isCreatedHomework: "IDLE",
    isUpdatedHomework: "IDLE",
    isUpdatedHomeworkSolution: "IDLE",
    isUpdatedSolutionAnswer: "IDLE",
    isDeletedHomework: "IDLE",
}

export const homeworksSlice = createSlice({
    name: 'homeworks',
    initialState,
    reducers: {
        handleClearIsCreatedSolutionAnswer(state) {
            state.isCreatedSolutionAnswer = "IDLE"
        },
        handleClearIsUpdateHomeworkSolution(state) {
            state.isUpdatedHomeworkSolution = "IDLE"
        },
        handleClearSolutionsList(state) {
            state.isLoadingHomeworkSolutions = "IDLE"
            state.homeworkSolutionsList = []
        },
        handleClearStudentAnswers(state) {
            state.isLoadingStudentAnswers = "IDLE"
            state.studentAnswers = []
        },
        handleClearHomeworkTasks(state) {
            state.currentHomeworkTasks = []
            state.isLoadingHomeworkTasks = "IDLE"
        },
        handleClearCurrentSolution(state) {
            state.isLoadingCurrentSolution = "IDLE"
            state.currentSolution = null
        },
        handleClearCurrentHomework(state) {
            state.isLoadingHomework = "IDLE"
            state.currentHomework = null
        },
        handleClearIsCreatedHomework(state) {
            state.isCreatedHomework = "IDLE"
        },
        handleClearIsDeletedHomework(state) {
            state.isDeletedHomework = "IDLE"
        },
        handleClearIsUpdateSolutionAnswer(state) {
            state.isUpdatedSolutionAnswer = "IDLE"
        },
        setCurrentSolution(state, action) {
            state.currentSolution = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);

        // get-homeworks-list
        builder.addCase(getHomeworksList.fulfilled, (state, action) => {
            state.homeworksList = action.payload.homeworksList;
            state.isLoadingHomeworksList = action.payload.homeworksList ? "SUCCESS" : "ERROR";
        });
        builder.addCase(getHomeworksList.pending, (state) => {
            state.isLoadingHomeworksList = "PENDING";
        });
        builder.addCase(getHomeworksList.rejected, (state) => {
            state.homeworksList = [];
            state.isLoadingHomeworksList = "ERROR";
        });

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

        // get-current-solution
        builder.addCase(getCurrentSolution.fulfilled, (state, action) => {
            state.currentSolution = action.payload.solution;
            state.isLoadingCurrentSolution = action.payload.solution ? "SUCCESS" : "ERROR";
        });
        builder.addCase(getCurrentSolution.pending, (state) => {
            state.isLoadingCurrentSolution = "PENDING";
        });
        builder.addCase(getCurrentSolution.rejected, (state) => {
            state.currentSolution = null;
            state.isLoadingCurrentSolution = "ERROR";
        });

        // get-homework-solutions
        builder.addCase(getHomeworkSolutions.fulfilled, (state, action) => {
            state.homeworkSolutionsList = action.payload.homeworkSolutionsList || [];
            state.isLoadingHomeworkSolutions = action.payload.homeworkSolutionsList ? "SUCCESS" : "ERROR";
        });
        builder.addCase(getHomeworkSolutions.pending, (state) => {
            state.isLoadingHomeworkSolutions = "PENDING";
        });
        builder.addCase(getHomeworkSolutions.rejected, (state) => {
            state.homeworkSolutionsList = [];
            state.isLoadingHomeworkSolutions = "ERROR";
        });

        // get-homework-tasks
        builder.addCase(getHomeworkTasks.fulfilled, (state, action) => {
            state.currentHomeworkTasks = action.payload.homeworkTasks || [];
            state.isLoadingHomeworkTasks = action.payload.homeworkTasks ? "SUCCESS" : "ERROR";
        });
        builder.addCase(getHomeworkTasks.pending, (state) => {
            state.isLoadingHomeworkTasks = "PENDING";
        });
        builder.addCase(getHomeworkTasks.rejected, (state) => {
            state.currentHomeworkTasks = [];
            state.isLoadingHomeworkTasks = "ERROR";
        });

        // get-student-answers
        builder.addCase(getStudentAnswers.fulfilled, (state, action) => {
            state.studentAnswers = action.payload.homeworkAnswers || [];
            state.isLoadingStudentAnswers = action.payload.homeworkAnswers ? "SUCCESS" : "ERROR";
        });
        builder.addCase(getStudentAnswers.pending, (state) => {
            state.isLoadingStudentAnswers = "PENDING";
        });
        builder.addCase(getStudentAnswers.rejected, (state) => {
            state.studentAnswers = [];
            state.isLoadingStudentAnswers = "ERROR";
        });

        // get-homeworks-by-student-id
        builder.addCase(getHomeworksByStudentId.fulfilled, (state, action) => {
            state.homeworksList = action.payload.homeworksList || [];
            state.isLoadingHomeworksList = action.payload.homeworksList ? "SUCCESS" : "ERROR";
        });
        builder.addCase(getHomeworksByStudentId.pending, (state) => {
            state.isLoadingHomeworksList = "PENDING";
        });
        builder.addCase(getHomeworksByStudentId.rejected, (state) => {
            state.homeworksList = [];
            state.isLoadingHomeworksList = "ERROR";
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

        // update-homework-solution
        builder.addCase(updateHomeworkSolution.fulfilled, (state, action) => {
            state.isUpdatedHomeworkSolution = action.payload.isUpdatedHomeworkSolution ? "SUCCESS" : "ERROR";
        });
        builder.addCase(updateHomeworkSolution.pending, (state) => {
            state.isUpdatedHomeworkSolution = "PENDING";
        });
        builder.addCase(updateHomeworkSolution.rejected, (state) => {
            state.isUpdatedHomeworkSolution = "ERROR";
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
    handleClearSolutionsList,
    handleClearCurrentHomework,
    handleClearIsCreatedHomework,
    handleClearIsDeletedHomework,
    handleClearCurrentSolution,
    handleClearHomeworkTasks,
    handleClearIsCreatedSolutionAnswer,
    handleClearStudentAnswers,
    handleClearIsUpdateSolutionAnswer,
    setCurrentSolution
} = homeworksSlice.actions

export default homeworksSlice.reducer