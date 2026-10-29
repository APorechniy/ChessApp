import { createSlice } from '@reduxjs/toolkit'
import type { ChessOpeningsState } from './types'
import { CLEAR_STORE } from '../const'

const initialState: ChessOpeningsState = {
    chessOpeningsList: [],
}

export const chessOpeningsSlice = createSlice({
    name: 'chess-openings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);
    }
})

export default chessOpeningsSlice.reducer