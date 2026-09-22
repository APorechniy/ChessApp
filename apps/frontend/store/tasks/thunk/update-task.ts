import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { tasksApi } from "../api";
import type { UpdateTaskParams } from "../api/update-task";

export const updateTask = createAsyncThunk(
    ACTIONS.UpdateTask,
    async (params: UpdateTaskParams, { rejectWithValue }) => {
        try {
            const response = await tasksApi.updateTask(params);

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
