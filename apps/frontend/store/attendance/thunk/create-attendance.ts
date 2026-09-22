import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { attendanceApi } from "../api";
import { CreateAttendanceParams } from "../api/create-attendance";

export const createAttendance = createAsyncThunk(
    ACTIONS.CreateAttendance,
    async (params: CreateAttendanceParams, { rejectWithValue }) => {
        try {
            const response = await attendanceApi.createAttendance(params);

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
