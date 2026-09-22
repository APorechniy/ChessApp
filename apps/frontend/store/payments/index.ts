import { createSlice } from '@reduxjs/toolkit'
import { CLEAR_STORE } from '../const'
import type { PaymentsState } from './types'
import { createPayment } from './thunk/create-payment'
import { getPaymentStatus } from './thunk/get-payment-status'

const initialState: PaymentsState = {
    widgetId: null,
    paymentId: null,
    paymentStatus: null,

    isLoadingPayment: "IDLE",
    isLoadingPaymentStatus: "IDLE",
}

export const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        handleClearPayments(state) {
            state.widgetId = null;
            state.paymentId = null;
            state.isLoadingPayment = "IDLE";
        },
        handleClearPaymentStatus(state) {
            state.paymentStatus = null;
            state.isLoadingPaymentStatus = "IDLE";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);
        // create-payment
        builder.addCase(createPayment.fulfilled, (state, action) => {
            state.widgetId = action.payload.widgetId;
            state.paymentId = action.payload.paymentId;
            state.isLoadingPayment = "SUCCESS";
        });
        builder.addCase(createPayment.pending, (state) => {
            state.isLoadingPayment = "PENDING";
        });
        builder.addCase(createPayment.rejected, (state) => {
            state.isLoadingPayment = "ERROR";
            state.widgetId = null;
            state.paymentId = null;
        });

        // get-payment-status
        builder.addCase(getPaymentStatus.fulfilled, (state, action) => {
            state.paymentStatus = action.payload.status;
            state.isLoadingPaymentStatus = "SUCCESS";
        });
        builder.addCase(getPaymentStatus.pending, (state) => {
            state.isLoadingPaymentStatus = "PENDING";
        });
        builder.addCase(getPaymentStatus.rejected, (state) => {
            state.isLoadingPaymentStatus = "ERROR";
            state.paymentStatus = null;
        });
    }
})

export const {
    handleClearPayments,
    handleClearPaymentStatus,
} = paymentsSlice.actions

export default paymentsSlice.reducer