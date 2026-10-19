import { createSlice } from '@reduxjs/toolkit'
import { type LevelsState } from './types'
import { CLEAR_STORE } from '../const'

const initialState: LevelsState = {
    levelsList: [],
}

export const levelsSlice = createSlice({
    name: 'levels',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);
    }
})

export default levelsSlice.reducer