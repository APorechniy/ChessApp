import { createSlice } from '@reduxjs/toolkit'
import { type LearningTopicsState } from './types'

import { CLEAR_STORE } from '../const'
import { getFilteredLearningTopics, getLearningTopics } from './thunk/get-learning-topics'
import { createLearningTopic } from './thunk/create-learning-topic'
import { updateLearningTopic } from './thunk/update-learning-topic'
import { removeLearningTopic } from './thunk/remove-learning-topic'

const initialState: LearningTopicsState = {
    learningTopicsList: [],
    selectedLearningTopic: null,

    isLoadingFilteredLearningTopics: "IDLE",
    isLoadingLearningTopics: "IDLE",
    isCreateLearningTopic: "IDLE",
    isUpdateLearningTopic: "IDLE",
    isRemoveLearningTopic: "IDLE",
}

export const learningTopicsSlice = createSlice({
    name: 'learning-topics',
    initialState,
    reducers: {
        handleClearLearningTopicsList(state) {
            state.learningTopicsList = []
        },
        handleClearGetFilteredLearningTopic(state) {
            state.isLoadingFilteredLearningTopics = "IDLE"
        },
        handleClearCreateLearningTopic(state) {
            state.isCreateLearningTopic = "IDLE"
        },
        handleClearUpdateLearningTopic(state) {
            state.isUpdateLearningTopic = "IDLE"
        },
        handleClearRemoveLearningTopic(state) {
            state.isRemoveLearningTopic = "IDLE"
        },
        handleChangeSelectedLearningTopic(state, action) {
            state.selectedLearningTopic = action.payload.learningTopic;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);
        // get-learning-topics
        builder.addCase(getLearningTopics.fulfilled, (state, action) => {
            state.learningTopicsList = action.payload.learningTopicsList;
            state.isLoadingLearningTopics = "SUCCESS";
        });
        builder.addCase(getLearningTopics.pending, (state) => {
            state.isLoadingLearningTopics = "PENDING";
        });
        builder.addCase(getLearningTopics.rejected, (state) => {
            state.isLoadingLearningTopics = "ERROR";
            state.learningTopicsList = [];
        });

        // get-filtered-learning-topics
        builder.addCase(getFilteredLearningTopics.fulfilled, (state, action) => {
            state.learningTopicsList = action.payload.learningTopicsList;
            state.isLoadingFilteredLearningTopics = "SUCCESS";
        });
        builder.addCase(getFilteredLearningTopics.pending, (state) => {
            state.isLoadingFilteredLearningTopics = "PENDING";
        });
        builder.addCase(getFilteredLearningTopics.rejected, (state) => {
            state.isLoadingFilteredLearningTopics = "ERROR";
            state.learningTopicsList = [];
        });

        // create-learning-topic
        builder.addCase(createLearningTopic.fulfilled, (state) => {
            state.isCreateLearningTopic = "SUCCESS";
        });
        builder.addCase(createLearningTopic.pending, (state) => {
            state.isCreateLearningTopic = "PENDING";
        });
        builder.addCase(createLearningTopic.rejected, (state) => {
            state.isCreateLearningTopic = "ERROR";
        });

        // update-learning-topic
        builder.addCase(updateLearningTopic.fulfilled, (state) => {
            state.isUpdateLearningTopic = "SUCCESS";
        });
        builder.addCase(updateLearningTopic.pending, (state) => {
            state.isUpdateLearningTopic = "PENDING";
        });
        builder.addCase(updateLearningTopic.rejected, (state) => {
            state.isUpdateLearningTopic = "ERROR";
        });

        // remove-learning-topic
        builder.addCase(removeLearningTopic.fulfilled, (state, action) => {
            state.isRemoveLearningTopic = action.payload.isRemoveLearningTopic ? "SUCCESS" : "ERROR";
        });
        builder.addCase(removeLearningTopic.pending, (state) => {
            state.isRemoveLearningTopic = "PENDING";
        });
        builder.addCase(removeLearningTopic.rejected, (state) => {
            state.isRemoveLearningTopic = "ERROR";
        });
    }
})

export const {
    handleClearLearningTopicsList,
    handleClearGetFilteredLearningTopic,
    handleClearCreateLearningTopic,
    handleClearUpdateLearningTopic,
    handleClearRemoveLearningTopic,
    handleChangeSelectedLearningTopic,
} = learningTopicsSlice.actions

export default learningTopicsSlice.reducer