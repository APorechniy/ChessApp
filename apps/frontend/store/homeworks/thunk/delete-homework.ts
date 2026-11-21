import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { homeworksApi } from "../api";
import { type DeleteHomeworkParams } from "../api/delete-homework";

export const deleteHomework = createAsyncThunk(
    ACTIONS.DeleteHomework,
    async (params: DeleteHomeworkParams, { rejectWithValue }) => {
        try {
            const response = await homeworksApi.deleteHomework(params);

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
