import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { systemApi } from "../api";

export const getSettings = createAsyncThunk(
    ACTIONS.GetSettings,
    async (_, { rejectWithValue }) => {
        try {
            const response = await systemApi.getSettings();

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
