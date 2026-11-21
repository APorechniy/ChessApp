import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { authApi } from "../api";
import { clearStore } from "store/store";
import { baseApi } from "store/api/base-api";

export const logout = createAsyncThunk(
    ACTIONS.logout,
    async (_, { dispatch }) => {
        try {
            const response = await authApi.logout();

            if (!response) {
                throw new Error();
            }

            return true;
        } finally {
            dispatch(clearStore())
            dispatch(baseApi.util.resetApiState())
        }
    }
);
