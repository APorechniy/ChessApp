import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { systemApi } from "../api";
import { type UpdateSettingsParams } from "../api/update-settings";

export const updateSettings = createAsyncThunk(
    ACTIONS.UpdateSettings,
    async (params: UpdateSettingsParams, { rejectWithValue }) => {
        try {
            const response = await systemApi.updateSettings(params);

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
