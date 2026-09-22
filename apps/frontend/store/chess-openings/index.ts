import { createSlice } from '@reduxjs/toolkit'
import type { ChessOpeningsState } from './types'
import { getChessOpenings } from './thunk/get-chess-openings'
import { CLEAR_STORE } from '../const'
import { createChessOpening } from './thunk/create-chess-opening'

const initialState: ChessOpeningsState = {
    chessOpeningsList: [],

    isLoadingChessOpenings: "IDLE",
    isCreateChessOpening: "IDLE",
}

export const chessOpeningsSlice = createSlice({
    name: 'chess-openings',
    initialState,
    reducers: {
        handleClearIsCreatedChessOpening(state) {
            state.isCreateChessOpening = "IDLE"
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);
        // get-chess-openings
        builder.addCase(getChessOpenings.fulfilled, (state, action) => {
            state.chessOpeningsList = action.payload.chessOpeningsList;
            state.isLoadingChessOpenings = "SUCCESS";
        });
        builder.addCase(getChessOpenings.pending, (state) => {
            state.isLoadingChessOpenings = "PENDING";
        });
        builder.addCase(getChessOpenings.rejected, (state) => {
            state.isLoadingChessOpenings = "ERROR";
            state.chessOpeningsList = [];
        });

        // create-chess-opening
        builder.addCase(createChessOpening.fulfilled, (state, action) => {
            state.isCreateChessOpening = action.payload.isCreatedChessOpening ? "SUCCESS" : "ERROR";
        });
        builder.addCase(createChessOpening.pending, (state) => {
            state.isCreateChessOpening = "PENDING";
        });
        builder.addCase(createChessOpening.rejected, (state) => {
            state.isCreateChessOpening = "ERROR";
        });
    }
})

export const {
    handleClearIsCreatedChessOpening
} = chessOpeningsSlice.actions

export default chessOpeningsSlice.reducer