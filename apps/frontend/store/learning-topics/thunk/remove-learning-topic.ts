import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { learningTopicsApi } from "../api";
import type { RemoveLearningTopicParams } from "../api/remove-learning-topic";

export const removeLearningTopic = createAsyncThunk(
    ACTIONS.RemoveLearningTopic,
    async (params: RemoveLearningTopicParams, { rejectWithValue }) => {
        try {
            const response = await learningTopicsApi.removeLearningTopic(params);

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
