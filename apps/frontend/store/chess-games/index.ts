import { createSlice } from '@reduxjs/toolkit'
import type { ChessGamesState } from './types'
import { getChessGames } from './thunk/get-chess-games'
import { CLEAR_STORE } from '../const'
import { createChessGame } from './thunk/create-chess-game'

const initialState: ChessGamesState = {
    chessGamesList: [],

    isCreateChessGame: "IDLE",
    isLoadingChessGamesList: "IDLE",
}

export const chessGamesSlice = createSlice({
    name: 'chess-games',
    initialState,
    reducers: {
        handleClearIsCreatedChessGame(state) {
            state.isCreateChessGame = "IDLE"
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);
        // get-chess-games
        builder.addCase(getChessGames.fulfilled, (state, action) => {
            state.chessGamesList = action.payload.chessGamesList;
            state.isLoadingChessGamesList = "SUCCESS";
        });
        builder.addCase(getChessGames.pending, (state) => {
            state.isLoadingChessGamesList = "PENDING";
        });
        builder.addCase(getChessGames.rejected, (state) => {
            state.isLoadingChessGamesList = "ERROR";
            state.chessGamesList = [];
        });

        // create-chess-game
        builder.addCase(createChessGame.fulfilled, (state, action) => {
            state.isCreateChessGame = action.payload.isCreatedChessGame ? "SUCCESS" : "ERROR";
        });
        builder.addCase(createChessGame.pending, (state) => {
            state.isCreateChessGame = "PENDING";
        });
        builder.addCase(createChessGame.rejected, (state) => {
            state.isCreateChessGame = "ERROR";
        });
    }
})

export const {
    handleClearIsCreatedChessGame
} = chessGamesSlice.actions

export default chessGamesSlice.reducer