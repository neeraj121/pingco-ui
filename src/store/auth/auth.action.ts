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
            const config = {
                method: "post",
                url: `${process.env.REACT_APP_API_URL}/api/ui/auth`,
                headers: {
                    "X-RequestScope": "20",
                    "Content-Type": "application/json",
                },
                data: loginFields,
            };
            const response = await axios.request(config);

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
            const config = {
                method: "post",
                url: `${process.env.REACT_APP_API_URL}/api/ui/register`,
                headers: {
                    "X-RequestScope": "20",
                    "Content-Type": "application/json",
                },
                data: registerFields,
            };
            const response = await axios.request(config);

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
