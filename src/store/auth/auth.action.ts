import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

export type LoginFields = {
    username: string;
    password: string;
};

export const loginUserAsync = createAsyncThunk(
    "user/loginUser",
    async (loginFields: LoginFields, { dispatch }) => {
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
                dispatch(getAccessList(response?.data?.token));
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

export const checkAccessTokenValid = createAsyncThunk(
    "user/checkAccessTokenValid",
    async (authToken: string) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/ui/Authed`,
                {
                    headers: {
                        accept: "application/json",
                        "X-RequestScope": "20",
                        Authorization: `bearer ${authToken}`,
                    },
                }
            );

            if (response?.data?.success) {
                return true;
            } else {
                throw new Error("Unable to validate Token.");
            }
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ||
                    error?.message ||
                    "Unable to validate Token."
            );
        }
    }
);

type RefreshTokenParams = {
    token: string;
    refreshToken: string;
};
export const refreshAccessToken = createAsyncThunk(
    "user/refreshAccessToken",
    async (refreshTokenParams: RefreshTokenParams) => {
        try {
            const config = {
                method: "post",
                url: `${process.env.REACT_APP_API_URL}/api/ui/renew`,
                headers: {
                    "X-RequestScope": "20",
                    "Content-Type": "application/json",
                },
                data: refreshTokenParams,
            };
            const response = await axios.request(config);

            if (response?.data?.token) {
                return response.data;
            } else {
                throw new Error("Login expired. Please login to continue.");
            }
        } catch (error: any) {
            throw new Error("Login expired. Please login to continue.");
        }
    }
);

export const getAccessList = createAsyncThunk(
    "user/getAccessList",
    async (authToken: string) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/ui/AccessList`,
                {
                    headers: {
                        accept: "application/json",
                        "X-RequestScope": "60",
                        Authorization: `bearer ${authToken}`,
                    },
                }
            );

            if (response?.data) {
                return response.data;
            } else {
                throw new Error(
                    "Permission Set has not been assigned to the current user. Please speak to your administrator."
                );
            }
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ||
                    error?.message ||
                    "Permission Set has not been assigned to the current user. Please speak to your administrator."
            );
        }
    }
);
