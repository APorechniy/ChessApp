import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { attendancePresetsApi } from "../api";

export const getAttendancePresets = createAsyncThunk(
    ACTIONS.GetAttendancePresets,
    async (_, { rejectWithValue }) => {
        try {
            const response = await attendancePresetsApi.getAttendancePresets();

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
