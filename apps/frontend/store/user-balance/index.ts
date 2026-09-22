import { createSlice } from '@reduxjs/toolkit'
import { type UserBalanceState } from './types'
import { getUserBalance } from './thunk/get-user-balance'
import { CLEAR_STORE } from '../const'

const initialState: UserBalanceState = {
    balance: 0,

    isLoadingBalance: "IDLE"
}

export const userBalanceSlice = createSlice({
    name: 'user-balance',
    initialState,
    reducers: {
        handleClearUserBalance(state) {
            state.balance = 0
            state.isLoadingBalance = "IDLE"
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);
        // get-user
        builder.addCase(getUserBalance.fulfilled, (state, action) => {
            state.balance = action.payload.balance;
            state.isLoadingBalance = "SUCCESS";
        });
        builder.addCase(getUserBalance.pending, (state) => {
            state.isLoadingBalance = "PENDING";
        });
        builder.addCase(getUserBalance.rejected, (state) => {
            state.isLoadingBalance = "ERROR";
            state.balance = 0;
        });
    }
})

export const {
    handleClearUserBalance
} = userBalanceSlice.actions

export default userBalanceSlice.reducer