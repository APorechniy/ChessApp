import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { studentsAttendedApi } from "../api";
import { type GetStudentsAttendedParams } from "../api/get-students-attended";

export const getStudentsAttended = createAsyncThunk(
    ACTIONS.GetStudentsAttended,
    async (params: GetStudentsAttendedParams, { rejectWithValue }) => {
        try {
            const response = await studentsAttendedApi.getStudentsAttended(params);

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
