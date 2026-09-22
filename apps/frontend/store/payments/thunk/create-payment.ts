import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { paymentsApi } from "../api";
import type { CreatePaymentParams } from "../api/create-payment";

export const createPayment = createAsyncThunk(
    ACTIONS.CreatePayment,
    async (params: CreatePaymentParams, { rejectWithValue }) => {
        try {
            const response = await paymentsApi.createPayment(params);

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
