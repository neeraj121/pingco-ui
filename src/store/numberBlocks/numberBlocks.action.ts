import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NumberBlock } from "./numberBlocks.reducer";

type GetNumberBlocksArgs = {
    wholesalerID: string;
    token: string;
};

export const fetchNumberBlocks = createAsyncThunk(
    "numberBlocks/fetchNumberBlocks",
    async (args: GetNumberBlocksArgs) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/ui/NumberBlocks/${args.wholesalerID}`,
                {
                    headers: {
                        accept: "application/json",
                        "X-RequestScope": "60",
                        Authorization: `bearer ${args.token}`,
                    },
                }
            );
            if (response?.data) {
                return response.data as NumberBlock[];
            } else {
                throw new Error(
                    "There was an unexpected error. Please try again later."
                );
            }
        } catch (error: any) {
            console.log(error);
            throw new Error(
                error?.response?.data?.message ||
                    error?.message ||
                    "There was an unexpected error. Please try again later."
            );
        }
    }
);
