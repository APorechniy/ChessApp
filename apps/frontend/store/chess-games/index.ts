import { createSlice } from '@reduxjs/toolkit'
import type { ChessGamesState } from './types'
import { CLEAR_STORE } from '../const'

const initialState: ChessGamesState = {
    chessGamesList: [],
}

export const chessGamesSlice = createSlice({
    name: 'chess-games',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);
    }
})

export default chessGamesSlice.reducer