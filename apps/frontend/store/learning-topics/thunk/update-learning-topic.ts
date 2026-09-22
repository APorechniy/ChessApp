import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { learningTopicsApi } from "../api";
import type { UpdateLearningTopicParams } from "../api/update-learning-topic";

export const updateLearningTopic = createAsyncThunk(
    ACTIONS.UpdateLearningTopic,
    async (params: UpdateLearningTopicParams, { rejectWithValue }) => {
        try {
            const response = await learningTopicsApi.updateLearningTopic(params);

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
