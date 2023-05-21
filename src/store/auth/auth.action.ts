import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type LoginFields = {
    username: string;
    password: string;
};

export const loginUserAsync = createAsyncThunk(
    "user/loginUser",
    async (loginFields: LoginFields) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth`,
                loginFields
            );
            if (response?.data?.token) {
                return response.data;
            } else {
                throw new Error(
                    "There was an unexpected error. Please try again later."
                );
            }
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ||
                    error?.message ||
                    "There was an unexpected error. Please try again later."
            );
        }
    }
);

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
    async (registerFields: RegisterFields) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/ui/register`,
                registerFields
            );
            if (response?.data) {
                return response.data;
            } else {
                throw new Error(
                    "There was an unexpected error. Please try again later."
                );
            }
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ||
                    error?.message ||
                    "There was an unexpected error. Please try again later."
            );
        }
    }
);
