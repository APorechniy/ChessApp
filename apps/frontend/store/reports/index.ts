import { createSlice } from '@reduxjs/toolkit'
import { type ReportsState } from './types'
import { createReport } from './thunk/create-report'
import { CLEAR_STORE } from '../const'
import { createCoachReport } from './thunk/create-coach-report'

const initialState: ReportsState = {
    currentReport: null,
    isLoadingReport: "IDLE"
}

export const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
        handleClearReports(state) {
            state.currentReport = null
            state.isLoadingReport = "IDLE"
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);
        // create-report
        builder.addCase(createReport.fulfilled, (state, action) => {
            state.currentReport = action.payload.currentReport;
            state.isLoadingReport = "SUCCESS";
        });
        builder.addCase(createReport.pending, (state) => {
            state.isLoadingReport = "PENDING";
        });
        builder.addCase(createReport.rejected, (state) => {
            state.isLoadingReport = "ERROR";
            state.currentReport = null;
        });

        // create-coach-report
        builder.addCase(createCoachReport.fulfilled, (state, action) => {
            state.currentReport = action.payload.currentReport;
            state.isLoadingReport = "SUCCESS";
        });
        builder.addCase(createCoachReport.pending, (state) => {
            state.isLoadingReport = "PENDING";
        });
        builder.addCase(createCoachReport.rejected, (state) => {
            state.isLoadingReport = "ERROR";
            state.currentReport = null;
        });
    }
})

export const {
    handleClearReports
} = reportsSlice.actions

export default reportsSlice.reducer