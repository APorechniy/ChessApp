import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { authApi } from "../api";
import { SignInParams } from "../api/sign-in";

export const signIn = createAsyncThunk(
    ACTIONS.SingIn,
    async (params: SignInParams, { rejectWithValue }) => {
        try {
            const response = await authApi.signIn(params);

            return response;
        } catch (error) {
            return rejectWithValue({
                status: error.status,
                data: error.data,
                message: error.message,
            });
        }
    },
);
