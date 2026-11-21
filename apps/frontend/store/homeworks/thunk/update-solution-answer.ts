import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { homeworksApi } from "../api";
import type { UpdateSolutionAnswerParams } from "../api/update-solution-answer";

export const updateSolutionAnswer = createAsyncThunk(
    ACTIONS.UpdateSolutionAnswer,
    async (params: UpdateSolutionAnswerParams, { rejectWithValue }) => {
        try {
            const response = await homeworksApi.updateSolutionAnswer(params);

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
