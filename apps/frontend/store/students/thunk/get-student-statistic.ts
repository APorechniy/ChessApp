import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { studentsApi } from "../api";
import { type GetStudentStatisticParams } from "../api/get-statistic";

export const getStudentStatistic = createAsyncThunk(
    ACTIONS.GetStudentStatistic,
    async (params: GetStudentStatisticParams, { rejectWithValue }) => {
        try {
            const response = await studentsApi.getStudentStatistic(params);

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
