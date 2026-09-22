import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { attendancePresetsApi } from "../api";
import { type DeleteAttendancePresetParams } from "../api/delete-preset";

export const deleteAttendancePreset = createAsyncThunk(
    ACTIONS.DeleteAttendancePreset,
    async (params: DeleteAttendancePresetParams, { rejectWithValue }) => {
        try {
            const response = await attendancePresetsApi.deleteAttendancePreset(params);

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
