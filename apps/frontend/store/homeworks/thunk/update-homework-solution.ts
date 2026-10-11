import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { homeworksApi } from "../api";
import type { UpdateHomeworkSolutionParams } from "../api/update-homework-solution";

export const updateHomeworkSolution = createAsyncThunk(
    ACTIONS.UpdateHomeworkSolution,
    async (params: UpdateHomeworkSolutionParams, { rejectWithValue }) => {
        try {
            const response = await homeworksApi.updateHomeworkSolution(params);

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
