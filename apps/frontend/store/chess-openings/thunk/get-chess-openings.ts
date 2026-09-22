import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { chessOpeningsApi } from "../api";

export const getChessOpenings = createAsyncThunk(
    ACTIONS.GetChessOpenings,
    async (_, { rejectWithValue }) => {
        try {
            const response = await chessOpeningsApi.getChessOpenings();

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
