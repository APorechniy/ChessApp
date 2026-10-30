import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { usersApi } from "../api";
import type { UpdateStudentDataParams, RejectResponse } from "../api/update-student-data";

type UpdateStudentDataResult = Awaited<ReturnType<typeof usersApi.updateStudentData>>;

type UpdateStudentDataReject = {
    status?: number;
    data?: unknown;
    message: string;
}

export const updateStudentData = createAsyncThunk<
    UpdateStudentDataResult,
    UpdateStudentDataParams,
    { rejectValue: UpdateStudentDataReject }
>(
    ACTIONS.UpdateStudentData,
    async (params: UpdateStudentDataParams, { rejectWithValue }) => {
        try {
            const response = await usersApi.updateStudentData(params);

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
