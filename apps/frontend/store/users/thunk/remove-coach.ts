import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { usersApi } from "../api";
import type { RemoveCoachParams } from "../api/remove-coach";

export const removeCoach = createAsyncThunk(
    ACTIONS.RemoveCoach,
    async (params: RemoveCoachParams, { rejectWithValue }) => {
        try {
            const response = await usersApi.removeCoach(params);

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
