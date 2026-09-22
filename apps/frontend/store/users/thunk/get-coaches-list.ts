import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { usersApi } from "../api";

export const getCoachesList = createAsyncThunk(
    ACTIONS.GetCoachesList,
    async (_, { rejectWithValue }) => {
        try {
            const response = await usersApi.getCoachesList();

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
