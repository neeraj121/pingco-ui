import { createSlice } from "@reduxjs/toolkit";
import {
    getAccessList,
    loginUserAsync,
    registerUserAsync,
} from "./auth.action";

type FormState = {
    isLoading: boolean;
    error: string | null;
    success: string | null;
};

type User = {
    token: string;
    expiration: string;
    refreshToken: string;
    refreshExpiration: string;
    defaultCompany: string;
    user: string;
    accessDetails: any;
} | null;

const defaultFormState = {
    isLoading: false,
    error: null,
    success: null,
};

type AuthState = {
    registerFormState: FormState;
    loginFormState: FormState;
    user: User;
};

const initialState: AuthState = {
    registerFormState: { ...defaultFormState },
    loginFormState: { ...defaultFormState },
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetRegisterFormState: (state) => {
            state.registerFormState = { ...defaultFormState };
        },
        resetLoginFormState: (state) => {
            state.loginFormState = { ...defaultFormState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUserAsync.pending, (state) => {
                state.registerFormState.isLoading = true;
                state.registerFormState.error = null;
                state.registerFormState.success = null;
            })
            .addCase(registerUserAsync.fulfilled, (state, action) => {
                state.registerFormState.isLoading = false;
                state.registerFormState.error = null;
                state.registerFormState.success = action.payload.message;
            })
            .addCase(registerUserAsync.rejected, (state, action) => {
                state.registerFormState.isLoading = false;
                state.registerFormState.error =
                    action.error.message ||
                    "There was an unexpected error. Please try again later.";
                state.registerFormState.success = null;
            })
            .addCase(loginUserAsync.pending, (state) => {
                state.loginFormState.isLoading = true;
                state.loginFormState.error = null;
                state.loginFormState.success = null;
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.loginFormState.isLoading = false;
                state.loginFormState.error = null;
                state.loginFormState.success = "Logged in successfully";
                state.user = action.payload as User;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.loginFormState.isLoading = false;
                state.loginFormState.error =
                    action.error.message ||
                    "There was an unexpected error. Please try again later.";
                state.loginFormState.success = null;
            })
            .addCase(getAccessList.fulfilled, (state, action) => {
                if (state.user) {
                    state.user.accessDetails = action.payload;
                }
            });
    },
});

export const { resetRegisterFormState, resetLoginFormState } =
    authSlice.actions;

export default authSlice.reducer;
