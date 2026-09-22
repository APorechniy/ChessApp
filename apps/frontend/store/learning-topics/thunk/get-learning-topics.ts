import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { learningTopicsApi } from "../api";
import type { GetLearningTopicsParams } from "../api/get-learning-topics";

export const getFilteredLearningTopics = createAsyncThunk(
    ACTIONS.GetFilteredLearningTopics,
    async (params: GetLearningTopicsParams, { rejectWithValue }) => {
        try {
            const response = await learningTopicsApi.getLearningTopics(params);

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

export const getLearningTopics = createAsyncThunk(
    ACTIONS.GetLearningTopics,
    async (_, { rejectWithValue }) => {
        try {
            const response = await learningTopicsApi.getLearningTopics({});

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
