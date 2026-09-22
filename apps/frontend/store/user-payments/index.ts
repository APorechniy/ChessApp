import { createSlice } from '@reduxjs/toolkit'
import { type UserPaymentsState } from './types'
import { getUserPaymentsHistory } from './thunk/get-user-payments-history'
import { CLEAR_STORE } from '../const'

const initialState: UserPaymentsState = {
    paymentsHistory: [],

    isLoadingPaymentHistory: "IDLE"
}

export const userPaymentsSlice = createSlice({
    name: 'user-payments',
    initialState,
    reducers: {
        handleClearHistory(state) {
            state.paymentsHistory = []
            state.isLoadingPaymentHistory = "IDLE"
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);
        // get-user-payments-history
        builder.addCase(getUserPaymentsHistory.fulfilled, (state, action) => {
            state.paymentsHistory = action.payload.paymentsHistory ? action.payload.paymentsHistory : [];
            state.isLoadingPaymentHistory = "SUCCESS";
        });
        builder.addCase(getUserPaymentsHistory.pending, (state) => {
            state.isLoadingPaymentHistory = "PENDING";
        });
        builder.addCase(getUserPaymentsHistory.rejected, (state) => {
            state.isLoadingPaymentHistory = "ERROR";
            state.paymentsHistory = [];
        });
    }
})

export const {
    handleClearHistory
} = userPaymentsSlice.actions

export default userPaymentsSlice.reducer