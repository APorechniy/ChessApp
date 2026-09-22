import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { authApi } from "../api";

export const logout = createAsyncThunk(
    ACTIONS.logout,
    async () => {
        const response = await authApi.logout();

        if (!response) {
            throw new Error();
        }

        return true;
    }
);
