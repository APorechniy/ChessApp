import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { studentsGroupsApi } from "../api";
import type { UpdateStudentsGroupParams } from "../api/update-students-group";

export const updateStudentsGroup = createAsyncThunk(
    ACTIONS.UpdateStudentsGroup,
    async (params: UpdateStudentsGroupParams, { rejectWithValue }) => {
        try {
            const response = await studentsGroupsApi.updateStudentsGroup(params);

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
