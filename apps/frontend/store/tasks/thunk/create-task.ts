import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { tasksApi } from "../api";
import type { CreateTaskParams } from "../api/create-task";

export const createTask = createAsyncThunk(
    ACTIONS.CreateTask,
    async (params: CreateTaskParams, { rejectWithValue }) => {
        try {
            const response = await tasksApi.createTask(params);

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
