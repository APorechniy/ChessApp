import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { tasksApi } from "../api";
import type { RemoveTaskParams } from "../api/remove-task";

export const removeTask = createAsyncThunk(
    ACTIONS.RemoveTask,
    async (params: RemoveTaskParams, { rejectWithValue }) => {
        try {
            const response = await tasksApi.removeTask(params);

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
