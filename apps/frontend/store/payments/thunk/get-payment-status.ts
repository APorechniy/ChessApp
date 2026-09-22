import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { paymentsApi } from "../api";
import type { GetPaymentStatusParams } from "../api/get-payment-status";

export const getPaymentStatus = createAsyncThunk(
    ACTIONS.GetPaymentStatus,
    async (params: GetPaymentStatusParams, { rejectWithValue }) => {
        try {
            const response = await paymentsApi.getPaymentStatus(params);

            return response;
        } catch (error) {
            return rejectWithValue({
                status: error.status,
                data: error.data,
                message: error.message,
            });
        }
    }
);
