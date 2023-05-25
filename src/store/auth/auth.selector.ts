import { RootState } from "../store";
import { createSelector } from "reselect";

const selectAuthSlice = (state: RootState) => state.auth;

export const selectRegisterFormState = createSelector(
    [selectAuthSlice],
    (authSlice) => authSlice.registerFormState
);

export const selectLoginFormState = createSelector(
    [selectAuthSlice],
    (authSlice) => authSlice.loginFormState
);

export const selectUser = createSelector(
    [selectAuthSlice],
    (authSlice) => authSlice.user
);
