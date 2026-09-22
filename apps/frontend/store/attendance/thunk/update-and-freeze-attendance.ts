import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { attendanceApi } from "../api";
import { type UpdateAndFreezeAttendanceParams } from "../api/update-and-freeze-attendance";

export const updateAndFreezeAttendance = createAsyncThunk(
    ACTIONS.UpdateAndFreezeAttendance,
    async (params: UpdateAndFreezeAttendanceParams, { rejectWithValue }) => {
        try {
            const response = await attendanceApi.updateAndFreezeAttendance(params);

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
