import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type AuthState } from './types'
import { signIn } from './thunk/sing-in'
import { CLEAR_STORE } from '../const'
import { updateToken } from './thunk/update-token'

const initialState: AuthState = {
    isAuth: false,

    authLoading: "IDLE",
    isRefreshingToken: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokenRefreshing: (state, action: PayloadAction<boolean>) => {
            state.isRefreshingToken = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_STORE, () => initialState);
        // sign-in
        builder.addCase(signIn.fulfilled, (state) => {
            state.isAuth = true;
            state.authLoading = "SUCCESS";
        });
        builder.addCase(signIn.pending, (state) => {
            state.authLoading = "PENDING";
        });
        builder.addCase(signIn.rejected, (state) => {
            state.authLoading = "ERROR";
            state.isAuth = false;
        });

        // update-token
        builder.addCase(updateToken.fulfilled, (state, action) => {
            state.isAuth = true;

            state.authLoading = "SUCCESS";
            state.isRefreshingToken = false;
        });
        builder.addCase(updateToken.pending, (state) => {
            state.authLoading = "PENDING";
            state.isRefreshingToken = true;
        });
        builder.addCase(updateToken.rejected, (state) => {
            state.authLoading = "ERROR";
            state.isAuth = false;
            state.isRefreshingToken = false;
        });
    }
})

export const {
    setTokenRefreshing
} = authSlice.actions

export default authSlice.reducer