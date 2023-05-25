import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NumberBlock } from "./numberBlocks.reducer";
import { checkBlockMergeConditions } from "../../utils/checkBlockMergeConditions";

type DefaultRequestParams = {
    authToken: string;
    wholesalerID: string;
};
export const fetchNumberBlocks = createAsyncThunk(
    "numberBlocks/fetchNumberBlocks",
    async ({ authToken, wholesalerID }: DefaultRequestParams) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/ui/NumberBlocks/${wholesalerID}`,
                {
                    headers: {
                        accept: "application/json",
                        "X-RequestScope": "60",
                        Authorization: `bearer ${authToken}`,
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

type SplitNumberParams = {
    authToken: string;
    numberBlock: NumberBlock;
};
export const splitNumberBlocks = createAsyncThunk(
    "numberBlocks/splitNumberBlocks",
    async ({ authToken, numberBlock }: SplitNumberParams) => {
        try {
            const splitBlocks = [];

            if (numberBlock.blockSize === 100) {
                // Split a 100 block into 10 blocks of 10
                for (let i = 0; i < 10; i++) {
                    const block = {
                        ...numberBlock,
                        id: undefined,
                        last: undefined,
                    };
                    block.blockSize = 10;
                    block.first = (
                        parseInt(numberBlock.first) +
                        i * 10
                    ).toString();
                    splitBlocks.push(block);
                }
            } else if (numberBlock.blockSize === 10) {
                // Split a 10 block into 2 blocks of 5
                for (let i = 0; i < 2; i++) {
                    const block = {
                        ...numberBlock,
                        id: undefined,
                        last: undefined,
                    };
                    block.blockSize = 5;
                    block.first = (
                        parseInt(numberBlock.first) +
                        i * 5
                    ).toString();
                    splitBlocks.push(block);
                }
            } else if (numberBlock.blockSize === 5) {
                // Split a 5 block into 5 blocks of 1
                for (let i = 0; i < 5; i++) {
                    const block = {
                        ...numberBlock,
                        id: undefined,
                        last: undefined,
                    };
                    block.blockSize = 1;
                    block.first = (parseInt(numberBlock.first) + i).toString();
                    splitBlocks.push(block);
                }
            } else {
                throw new Error("Cannot split a block of size 1");
            }

            // Delete the big number block
            const deleteConfig = {
                method: "delete",
                url: `${process.env.REACT_APP_API_URL}/api/ui/NumberBlock/${numberBlock.id}`,
                headers: {
                    "X-RequestScope": "60",
                    "Content-Type": "application/json",
                    Authorization: `bearer ${authToken}`,
                },
            };
            await axios.request(deleteConfig);

            // Create the smaller number blocks
            const createConfig = {
                method: "post",
                url: `${process.env.REACT_APP_API_URL}/api/ui/NumberBlock`,
                headers: {
                    "X-RequestScope": "60",
                    "Content-Type": "application/json",
                    Authorization: `bearer ${authToken}`,
                },
            };
            for (let i = 0; i < splitBlocks.length; i++) {
                await axios.request({ ...createConfig, data: splitBlocks[i] });
            }

            return {
                status: "success",
                message: "Number block split successfully!",
            };
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

type MergeNumberParams = {
    authToken: string;
    numberBlocks: NumberBlock[];
};
export const mergeNumberBlocks = createAsyncThunk(
    "numberBlocks/mergeNumberBlocks",
    async ({ authToken, numberBlocks }: MergeNumberParams) => {
        try {
            const mergeTestResult = checkBlockMergeConditions(numberBlocks);
            if (mergeTestResult.status === true) {
                // Delete the smaller number blocks
                const deleteConfig = {
                    method: "delete",
                    headers: {
                        "X-RequestScope": "60",
                        "Content-Type": "application/json",
                        Authorization: `bearer ${authToken}`,
                    },
                };
                for (let i = 0; i < numberBlocks.length; i++) {
                    await axios.request({
                        ...deleteConfig,
                        url: `${process.env.REACT_APP_API_URL}/api/ui/NumberBlock/${numberBlocks[i].id}`,
                    });
                }

                // Create the larger number blocks
                const createConfig = {
                    method: "post",
                    url: `${process.env.REACT_APP_API_URL}/api/ui/NumberBlock`,
                    headers: {
                        "X-RequestScope": "60",
                        "Content-Type": "application/json",
                        Authorization: `bearer ${authToken}`,
                    },
                    data: {
                        ...numberBlocks[0],
                        id: undefined,
                        first: mergeTestResult.first,
                        last: undefined,
                        blockSize: mergeTestResult.blockSize,
                    },
                };
                await axios.request(createConfig);

                return {
                    status: "success",
                    message: "Number blocks merged successfully!",
                };
            } else {
                throw new Error("These blocks cannot be merged.");
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
