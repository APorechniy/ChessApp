import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { homeworksApi } from "../api";
import { type GetHomeworkTasksParams } from "../api/get-homework-tasks";

export const getHomeworkTasks = createAsyncThunk(
    ACTIONS.GetHomeworkTasks,
    async (params: GetHomeworkTasksParams, { rejectWithValue }) => {
        try {
            const response = await homeworksApi.getHomeworkTasks(params);

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
