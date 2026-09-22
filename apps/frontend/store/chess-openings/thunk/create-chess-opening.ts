import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { chessOpeningsApi } from "../api";
import type { CreateChessOpeningParams } from "../api/create-chess-opening";

export const createChessOpening = createAsyncThunk(
    ACTIONS.CreateChessOpening,
    async (params: CreateChessOpeningParams, { rejectWithValue }) => {
        try {
            const response = await chessOpeningsApi.createChessOpening(params);

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
