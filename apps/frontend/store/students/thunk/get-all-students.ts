import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { studentsApi } from "../api";

export const getAllStudents = createAsyncThunk(
    ACTIONS.GetAllStudents,
    async (_, { rejectWithValue }) => {
        try {
            const response = await studentsApi.getAllStudents();

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
