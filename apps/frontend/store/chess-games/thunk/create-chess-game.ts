import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { chessGamesApi } from "../api";
import type { CreateChessGameParams } from "../api/create-chess-game";

export const createChessGame = createAsyncThunk(
    ACTIONS.CreateChessGame,
    async (params: CreateChessGameParams, { rejectWithValue }) => {
        try {
            const response = await chessGamesApi.createChessGame(params);

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
