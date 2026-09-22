import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTIONS } from "../const/actions";
import { studentsGroupsApi } from "../api";
import type { DeleteStudentsGroupParams } from "../api/delete-students-group";

export const deleteStudentsGroup = createAsyncThunk(
    ACTIONS.DeleteStudentsGroup,
    async (params: DeleteStudentsGroupParams, { rejectWithValue }) => {
        try {
            const response = await studentsGroupsApi.deleteStudentsGroup(params);

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
