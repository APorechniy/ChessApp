import { createSlice } from '@reduxjs/toolkit'
import { type UsersState } from './types'
import { getUser } from './thunk/get-user'
import { CLEAR_STORE } from '../const'
import { getCoachesList } from './thunk/get-coaches-list'
import { updateCoachData } from './thunk/update-coach-data'
import { createCoach } from './thunk/create-coach'
import { removeCoach } from './thunk/remove-coach'
import { updateStudentData } from './thunk/update-student-data'

const initialState: UsersState = {
    currentUser: null,

    editableCoach: null,

    coachesList: [],

    isLoadingUser: "IDLE",
    isLoadingCoachesList: "IDLE",
    isUpdatedCoachData: "IDLE",
    isUpdatedStudentData: "IDLE",
    isCreatedCoach: "IDLE",
    isRemovedCoach: "IDLE",

    updateErrorMessage: null,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        handleClearUsers(state) {
            state.currentUser = null
            state.isLoadingUser = "IDLE"
        },
        handleClearCoachesList(state) {
            state.coachesList = []
            state.isLoadingCoachesList = "IDLE"
        },
        handleClearIsUpdateCoachData(state) {
            state.isUpdatedCoachData = "IDLE"
        },
        handleClearIsUpdateStudentData(state) {
            state.isUpdatedStudentData = "IDLE"
        },
        handleClearIsCreatedCoach(state) {
            state.isCreatedCoach = "IDLE"
        },
        handleChangeEditableCoach(state, action) {
            state.editableCoach = action.payload.coach
        },
        handleClearIsRemovedCoach(state) {
            state.isRemovedCoach = "IDLE"
        },
        handleClearUpdateErrorMessage(state, action) {
            state.updateErrorMessage = action.payload.updateErrorMessage
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);
        // get-user
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.currentUser = action.payload.user;
            state.isLoadingUser = "SUCCESS";
        });
        builder.addCase(getUser.pending, (state) => {
            state.isLoadingUser = "PENDING";
        });
        builder.addCase(getUser.rejected, (state) => {
            state.isLoadingUser = "ERROR";
            state.currentUser = null;
        });

        // get-coaches-list
        builder.addCase(getCoachesList.fulfilled, (state, action) => {
            state.coachesList = action.payload.coachesList;
            state.isLoadingCoachesList = "SUCCESS";
        });
        builder.addCase(getCoachesList.pending, (state) => {
            state.isLoadingCoachesList = "PENDING";
        });
        builder.addCase(getCoachesList.rejected, (state) => {
            state.isLoadingCoachesList = "ERROR";
            state.coachesList = [];
        });

        // update-coach-data
        builder.addCase(updateCoachData.fulfilled, (state, action) => {
            state.isUpdatedCoachData = action.payload.isUpdatedCoach ? "SUCCESS" : "ERROR";
        });
        builder.addCase(updateCoachData.pending, (state) => {
            state.isUpdatedCoachData = "PENDING";
        });
        builder.addCase(updateCoachData.rejected, (state, action: any) => {
            state.isUpdatedCoachData = "ERROR";
            state.updateErrorMessage = action.payload?.message;
        });

        // update-student-data
        builder.addCase(updateStudentData.fulfilled, (state, action) => {
            state.isUpdatedStudentData = action.payload.isUpdatedStudent ? "SUCCESS" : "ERROR";
        });
        builder.addCase(updateStudentData.pending, (state) => {
            state.isUpdatedStudentData = "PENDING";
        });
        builder.addCase(updateStudentData.rejected, (state, action: any) => {
            state.isUpdatedStudentData = "ERROR";
            state.updateErrorMessage = action.payload?.message;
        });

        // create-coach
        builder.addCase(createCoach.fulfilled, (state, action) => {
            state.isCreatedCoach = action.payload.created ? "SUCCESS" : "ERROR";
        });
        builder.addCase(createCoach.pending, (state) => {
            state.isCreatedCoach = "PENDING";
        });
        builder.addCase(createCoach.rejected, (state) => {
            state.isCreatedCoach = "ERROR";
        });

        // remove-coach
        builder.addCase(removeCoach.fulfilled, (state, action) => {
            state.isRemovedCoach = action.payload.isRemoveCoach ? "SUCCESS" : "ERROR";
        });
        builder.addCase(removeCoach.pending, (state) => {
            state.isRemovedCoach = "PENDING";
        });
        builder.addCase(removeCoach.rejected, (state) => {
            state.isRemovedCoach = "ERROR";
        });
    }
})

export const {
    handleClearUsers,
    handleClearCoachesList,
    handleClearIsUpdateCoachData,
    handleClearIsUpdateStudentData,
    handleClearIsCreatedCoach,
    handleChangeEditableCoach,
    handleClearIsRemovedCoach,
    handleClearUpdateErrorMessage
} = usersSlice.actions

export default usersSlice.reducer