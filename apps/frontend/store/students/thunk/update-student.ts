import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { studentsApi } from "../api";
import type { UpdateStudentParams } from "../api/update-student";

export const updateStudent = createAsyncThunk(
    ACTIONS.UpdateStudent,
    async (params: UpdateStudentParams, { rejectWithValue }) => {
        try {
            const response = await studentsApi.updateStudent(params);

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
