import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { attendanceApi } from "../api";

export const getNextAttendance = createAsyncThunk(
    ACTIONS.GetNextAttendance,
    async (_, { rejectWithValue }) => {
        try {
            const response = await attendanceApi.getNextAttendance();

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
