import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { attendanceApi } from "../api";
import { type GetAttendancesForStudentParams } from "../api/get-attendances-for-student";

export const getAttendancesForStudent = createAsyncThunk(
    ACTIONS.GetAttendancesForStudent,
    async (params: GetAttendancesForStudentParams, { rejectWithValue }) => {
        try {
            const response = await attendanceApi.getAttendancesForStudent(params);

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
