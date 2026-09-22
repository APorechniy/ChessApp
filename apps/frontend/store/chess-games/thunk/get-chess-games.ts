import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { chessGamesApi } from "../api";
import type { GetChessGamesParams } from "../api/get-chess-games";

export const getChessGames = createAsyncThunk(
    ACTIONS.GetChessGames,
    async (params: GetChessGamesParams, { rejectWithValue }) => {
        try {
            const response = await chessGamesApi.getChessGames(params);

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
