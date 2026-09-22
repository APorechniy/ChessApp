import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { studentsGroupsApi } from "../api";
import type { CreateStudentsGroupParams } from "../api/create-students-group";

export const createStudentsGroup = createAsyncThunk(
    ACTIONS.CreateStudentsGroup,
    async (params: CreateStudentsGroupParams, { rejectWithValue }) => {
        try {
            const response = await studentsGroupsApi.createStudentsGroup(params);

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
