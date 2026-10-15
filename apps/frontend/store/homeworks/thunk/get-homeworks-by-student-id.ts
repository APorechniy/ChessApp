import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { homeworksApi } from "../api";
import { type GetHomeworksByStudentIdParams } from "../api/get-homeworks-by-student-id";

export const getHomeworksByStudentId = createAsyncThunk(
    ACTIONS.GetHomeworksByStudentId,
    async (params: GetHomeworksByStudentIdParams, { rejectWithValue }) => {
        try {
            const response = await homeworksApi.getHomeworksByStudentId(params);

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
