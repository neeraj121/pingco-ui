import { createAsyncThunk } from "@reduxjs/toolkit";

export type RegisterFields = {
    companyName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    partnerCode: string;
    terms: boolean;
    token: string;
};

export const registerUserAsync = createAsyncThunk(
    "user/registerUser",
    async (registerFields: RegisterFields, { dispatch }) => {
        try {
            console.log(registerFields);
            return { message: "Registered" };
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ||
                    error?.message ||
                    "There was an unexpected error. Please try again later."
            );
        }
    }
);
