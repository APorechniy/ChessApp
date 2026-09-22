import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { attendanceApi } from "../api";
import type { RemoveAttendanceParams } from "../api/remove-attendance";

export const removeAttendance = createAsyncThunk(
    ACTIONS.RemoveAttendance,
    async (params: RemoveAttendanceParams, { rejectWithValue }) => {
        try {
            const response = await attendanceApi.removeAttendance(params);

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
