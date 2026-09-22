import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { attendancePresetsApi } from "../api";
import { type UpdateAttendancePresetParams } from "../api/update-attendance-preset";

export const updateAttendancePreset = createAsyncThunk(
    ACTIONS.UpdateAttendancePreset,
    async (params: UpdateAttendancePresetParams, { rejectWithValue }) => {
        try {
            const response = await attendancePresetsApi.updateAttendancePreset(params);

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
