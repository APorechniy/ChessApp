import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { reportsApi } from "../api";
import type { CreateReportParams } from "../api/create-report";

export const createReport = createAsyncThunk(
    ACTIONS.CreateReport,
    async (params: CreateReportParams, { rejectWithValue }) => {
        try {
            const response = await reportsApi.createReport(params);

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
