import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { homeworksApi } from "../api";
import { type GetCurrentHomeworkParams } from "../api/get-current-homework";

export const getCurrentHomework = createAsyncThunk(
    ACTIONS.GetCurrentHomework,
    async (params: GetCurrentHomeworkParams, { rejectWithValue }) => {
        try {
            const response = await homeworksApi.getCurrentHomework(params);

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
