import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { tasksApi } from "../api";
import type { GetTaskByIdListParams } from "../api/get-task-by-id";

export const getEditableTask = createAsyncThunk(
    ACTIONS.GetTaskById,
    async (params: GetTaskByIdListParams, { rejectWithValue }) => {
        try {
            const response = await tasksApi.getTaskById(params);

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
