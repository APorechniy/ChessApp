import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { attendancePresetsApi } from "../api";
import { type ExcludeDateFromPresetParams } from "../api/exclude-date";

export const excludeDateFromPreset = createAsyncThunk(
    ACTIONS.ExcludeDate,
    async (params: ExcludeDateFromPresetParams, { rejectWithValue }) => {
        try {
            const response = await attendancePresetsApi.excludeDateFromPreset(params);

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
