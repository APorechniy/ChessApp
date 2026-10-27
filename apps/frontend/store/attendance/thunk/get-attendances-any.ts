import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { attendanceApi } from "../api";
import { type GetAttendancesAnyParams } from "../api/get-attendances-any";

export const getAttendancesAny = createAsyncThunk(
    ACTIONS.GetAttendancesAny,
    async (params: GetAttendancesAnyParams, { rejectWithValue }) => {
        try {
            const response = await attendanceApi.getAttendancesAny(params);

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
