import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { studentsGroupsApi } from "../api";

export const getStudentsGroups = createAsyncThunk(
    ACTIONS.GetStudentsGroups,
    async (_, { rejectWithValue }) => {
        try {
            const response = await studentsGroupsApi.getStudentsGroups();

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
