import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { userPaymentsApi } from "../api";
import { type GetUserPaymentsHistoryParams } from "../api/get-user-payments-history";

export const getUserPaymentsHistory = createAsyncThunk(
    ACTIONS.GetUserPaymentsHistory,
    async (params: GetUserPaymentsHistoryParams, { rejectWithValue }) => {
        try {
            const response = await userPaymentsApi.getUserPaymentsHistory(params);

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
