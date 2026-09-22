import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { attendancePresetsApi } from "../api";
import { type CreateAttendancePresetParams } from "../api/create-preset";

export const createAttendancePreset = createAsyncThunk(
    ACTIONS.CreateAttendancePreset,
    async (params: CreateAttendancePresetParams, { rejectWithValue }) => {
        try {
            const response = await attendancePresetsApi.createAttendancePreset(params);

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
