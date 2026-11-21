import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { homeworksApi } from "../api";
import { type GetCurrentSolutionParams } from "../api/get-current-solution";

export const getCurrentSolution = createAsyncThunk(
    ACTIONS.GetCurrentSolution,
    async (params: GetCurrentSolutionParams, { rejectWithValue }) => {
        try {
            const response = await homeworksApi.getCurrentSolution(params);

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
