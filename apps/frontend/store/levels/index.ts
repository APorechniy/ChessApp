import { createSlice } from '@reduxjs/toolkit'
import { type LevelsState } from './types'
import { getLevels } from './thunk/get-levels'
import { CLEAR_STORE } from '../const'

const initialState: LevelsState = {
    levelsList: [],

    isLoadingLevels: "IDLE"
}

export const levelsSlice = createSlice({
    name: 'levels',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);
        // get-levels
        builder.addCase(getLevels.fulfilled, (state, action) => {
            state.levelsList = action.payload.levelsList;
            state.isLoadingLevels = "SUCCESS";
        });
        builder.addCase(getLevels.pending, (state) => {
            state.isLoadingLevels = "PENDING";
        });
        builder.addCase(getLevels.rejected, (state) => {
            state.isLoadingLevels = "ERROR";
            state.levelsList = [];
        });
    }
})

export default levelsSlice.reducer