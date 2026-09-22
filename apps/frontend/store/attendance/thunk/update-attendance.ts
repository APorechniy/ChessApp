import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { attendanceApi } from "../api";
import { type UpdateAttendanceParams } from "../api/update-attendance";

export const updateAttendance = createAsyncThunk(
    ACTIONS.UpdateAttendace,
    async (params: UpdateAttendanceParams, { rejectWithValue }) => {
        try {
            const response = await attendanceApi.updateAttendance(params);

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
