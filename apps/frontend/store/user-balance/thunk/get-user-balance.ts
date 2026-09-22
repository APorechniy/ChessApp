import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { userBalanceApi } from "../api";

export const getUserBalance = createAsyncThunk(
    ACTIONS.GetUserBalance,
    async (_, { rejectWithValue }) => {
        try {
            const response = await userBalanceApi.getUserBalance();

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
