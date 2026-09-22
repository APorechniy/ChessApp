import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { attendanceApi } from "../api";
import { type GetAttendancesParams } from "../api/get-attendances";

export const getAttendances = createAsyncThunk(
    ACTIONS.GetAttendances,
    async (params: GetAttendancesParams, { rejectWithValue }) => {
        try {
            const response = await attendanceApi.getAttendances(params);

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
