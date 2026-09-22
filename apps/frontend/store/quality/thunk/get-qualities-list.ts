import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { qualitiesApi } from "../api";
import type { GetQualitiesListParams } from "../api/get-qualities-list";

export const getQualitiesList = createAsyncThunk(
    ACTIONS.GetQualitiesList,
    async (params: GetQualitiesListParams, { rejectWithValue }) => {
        try {
            const response = await qualitiesApi.getQualitiesList(params);

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
