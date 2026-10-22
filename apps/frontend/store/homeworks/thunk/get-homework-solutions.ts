import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { homeworksApi } from "../api";
import { type GetHomeworkSolutionsParams } from "../api/get-homework-solutions";

export const getHomeworkSolutions = createAsyncThunk(
    ACTIONS.GetHomeworkSolutions,
    async (params: GetHomeworkSolutionsParams, { rejectWithValue }) => {
        try {
            const response = await homeworksApi.getHomeworkSolutions(params);

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
