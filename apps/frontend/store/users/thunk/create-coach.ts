import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { usersApi } from "../api";
import type { CreateCoachParams } from "../api/create-coach";

export const createCoach = createAsyncThunk(
    ACTIONS.CreateCoach,
    async (params: CreateCoachParams, { rejectWithValue }) => {
        try {
            const response = await usersApi.createCoach(params);

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
