import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { homeworksApi } from "../api";
import type { UpdateHomeworkParams } from "../api/update-homework";

export const updateHomework = createAsyncThunk(
    ACTIONS.UpdateHomework,
    async (params: UpdateHomeworkParams, { rejectWithValue }) => {
        try {
            const response = await homeworksApi.updateHomework(params);

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
