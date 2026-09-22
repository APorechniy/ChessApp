import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { attendanceApi } from "../api";
import { type GetUnclosedAttendancesParams } from "../api/get-unclosed-attendances";

export const getUnclosedAttendances = createAsyncThunk(
    ACTIONS.GetUnclosedAttendances,
    async (params: GetUnclosedAttendancesParams, { rejectWithValue }) => {
        try {
            const response = await attendanceApi.getUnclosedAttendances(params);

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
