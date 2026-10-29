import { createSlice } from '@reduxjs/toolkit'
import { type UserBalanceState } from './types'
import { CLEAR_STORE } from '../const'

const initialState: UserBalanceState = {
    balance: 0,
}

export const userBalanceSlice = createSlice({
    name: 'user-balance',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);
    }
})

export default userBalanceSlice.reducer