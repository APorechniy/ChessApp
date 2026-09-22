import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { tasksApi } from "../api";
import type { GetTasksListParams } from "../api/get-tasks";

export const getFilteredTasks = createAsyncThunk(
    ACTIONS.GetFilteredTasks,
    async (params: Required<GetTasksListParams>) => {
        const response = await tasksApi.getTasks(params);

        if (!response) {
            throw new Error();
        }

        return response;
    }
);

export const getTasks = createAsyncThunk(
    ACTIONS.GetTasks,
    async (params: GetTasksListParams, { rejectWithValue }) => {
        try {
            const response = await tasksApi.getTasks(params);

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
