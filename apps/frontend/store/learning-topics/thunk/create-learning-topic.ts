import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { learningTopicsApi } from "../api";
import type { CreateLearningTopicParams } from "../api/create-learning-topic";

export const createLearningTopic = createAsyncThunk(
    ACTIONS.CreateLearningTopic,
    async (params: CreateLearningTopicParams, { rejectWithValue }) => {
        try {
            const response = await learningTopicsApi.createLearningTopic(params);

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
