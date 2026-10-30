import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { usersApi } from "../api";
import type { UpdateCoachDataParams, RejectResponse } from "../api/update-coach-data";

type UpdateCoachDataResult = Awaited<ReturnType<typeof usersApi.updateCoachData>>;

type UpdateCoachDataReject = {
    status?: number;
    data?: unknown;
    message: string;
}

export const updateCoachData = createAsyncThunk<
    UpdateCoachDataResult,
    UpdateCoachDataParams,
    { rejectValue: UpdateCoachDataReject }
>(
    ACTIONS.UpdateCoachData,
    async (params: UpdateCoachDataParams, { rejectWithValue }) => {
        try {
            const response = await usersApi.updateCoachData(params);

            return response;
        } catch (error) {
            const errorMessage = error.data as RejectResponse
            return rejectWithValue({
                status: error.status,
                data: error.data,
                message: errorMessage.errorMessage,
            });
        }
    }
);
