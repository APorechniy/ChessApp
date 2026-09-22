import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { studentsApi } from "../api";
import { CreateStudentParams } from "../api/create-student";

export const createStudent = createAsyncThunk(
    ACTIONS.CreateStudent,
    async (params: CreateStudentParams, { rejectWithValue }) => {
        try {
            const response = await studentsApi.createStudent(params);

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
