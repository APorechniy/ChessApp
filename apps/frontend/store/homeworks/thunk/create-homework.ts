import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { homeworksApi } from "../api";
import type { CreateHomeworkParams } from "../api/create-homework";

export const createHomework = createAsyncThunk(
    ACTIONS.CreateHomework,
    async (params: CreateHomeworkParams, { rejectWithValue }) => {
        try {
            const response = await homeworksApi.createHomework(params);

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
