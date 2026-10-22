import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { homeworksApi } from "../api";
import type { FreezeHomeworkParams } from "../api/freeze-homework";

export const freezeHomework = createAsyncThunk(
    ACTIONS.FreezeHomework,
    async (params: FreezeHomeworkParams, { rejectWithValue }) => {
        try {
            const response = await homeworksApi.freezeHomework(params);

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
