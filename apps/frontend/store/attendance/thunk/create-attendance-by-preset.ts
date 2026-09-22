import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { attendanceApi } from "../api";
import { type CreateAttendanceByPresetParams } from "../api/create-attendance-by-preset";

export const createAttendanceByPreset = createAsyncThunk(
    ACTIONS.CreateAttendanceByPreset,
    async (params: CreateAttendanceByPresetParams, { rejectWithValue }) => {
        try {
            const response = await attendanceApi.createAttendanceByPreset(params);

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
