import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { homeworksApi } from "../api";

export const getHomeworksList = createAsyncThunk(
    ACTIONS.GetHomeworksList,
    async (_, { rejectWithValue }) => {
        try {
            const response = await homeworksApi.getHomeworksList();

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
