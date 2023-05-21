import { createSlice } from "@reduxjs/toolkit";
import { registerUserAsync } from "./auth.action";

type FormState = {
    isLoading: boolean;
    error: string | null;
    success: string | null;
};

const defaultFormState = {
    isLoading: false,
    error: null,
    success: null,
};

type AuthState = {
    registerFormState: FormState;
};

const initialState: AuthState = {
    registerFormState: { ...defaultFormState },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetRegisterFormState: (state) => {
            state.registerFormState = { ...defaultFormState };
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
            });
    },
});

export default authSlice.reducer;
