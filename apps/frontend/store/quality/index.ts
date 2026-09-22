import { createSlice } from '@reduxjs/toolkit'
import { type QualitiesState } from './types'
import { getQualitiesList } from './thunk/get-qualities-list'
import { CLEAR_STORE } from '../const'

const initialState: QualitiesState = {
    qualitiesList: [],

    isLoadingQualitities: "IDLE"
}

export const qualitiesSlice = createSlice({
    name: 'qualities',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);
        // get-qualities-list
        builder.addCase(getQualitiesList.fulfilled, (state, action) => {
            state.qualitiesList = action.payload.qualitiesList;
            state.isLoadingQualitities = "SUCCESS";
        });
        builder.addCase(getQualitiesList.pending, (state) => {
            state.isLoadingQualitities = "PENDING";
        });
        builder.addCase(getQualitiesList.rejected, (state) => {
            state.isLoadingQualitities = "ERROR";
            state.qualitiesList = [];
        });
    }
})

export default qualitiesSlice.reducer