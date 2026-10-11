import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { homeworksApi } from "../api";
import type { CreateSolutionAnswerParams } from "../api/create-solution-answer";

export const createSolutionAnswer = createAsyncThunk(
    ACTIONS.CreateSolutionAnswer,
    async (params: CreateSolutionAnswerParams, { rejectWithValue }) => {
        try {
            const response = await homeworksApi.createSolutionAnswer(params);

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
