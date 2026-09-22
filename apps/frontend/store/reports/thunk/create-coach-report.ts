import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { reportsApi } from "../api";
import { type CreateCoachReportParams } from "../api/create-coach-report";

export const createCoachReport = createAsyncThunk(
    ACTIONS.CreateCoachReport,
    async (params: CreateCoachReportParams, { rejectWithValue }) => {
        try {
            const response = await reportsApi.createCoachReport(params);

            return response;
        } catch (error) {
            return rejectWithValue({
                status: error.status,
                data: error.data,
                message: error.message,
            });
        }
    }
);
