import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { authApi } from "../api";

export const updateToken = createAsyncThunk(
    ACTIONS.UpdateTokens,
    async () => {
        const response = await authApi.updateTokens();

        if (response.status === 401 || response.status === 403) {
            throw new Error();
        }

        return true;
    }
);
