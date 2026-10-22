import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { homeworksApi } from "../api";
import { type GetStudentAnswersParams } from "../api/get-student-answers";

export const getStudentAnswers = createAsyncThunk(
    ACTIONS.GetStudentAnswers,
    async (params: GetStudentAnswersParams, { rejectWithValue }) => {
        try {
            const response = await homeworksApi.getStudentAnswers(params);

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
