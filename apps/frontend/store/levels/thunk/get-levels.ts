import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { levelsApi } from "../api";

export const getLevels = createAsyncThunk(
    ACTIONS.GetLevels,
    async (_, { rejectWithValue }) => {
        try {
            const response = await levelsApi.getLevels();

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
