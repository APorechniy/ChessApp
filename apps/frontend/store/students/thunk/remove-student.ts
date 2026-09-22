import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { studentsApi } from "../api";
import type { RemoveStudentParams } from "../api/remove-student";

export const removeStudent = createAsyncThunk(
    ACTIONS.RemoveStudent,
    async (params: RemoveStudentParams, { rejectWithValue }) => {
        try {
            const response = await studentsApi.removeStudent(params);

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
