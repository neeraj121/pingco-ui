import { createSlice } from "@reduxjs/toolkit";
import {
    fetchNumberBlocks,
    mergeNumberBlocks,
    splitNumberBlocks,
} from "./numberBlocks.action";

enum NumberBlockPortingType {
    None = 0,
    Simple = 1,
    Complex = 2,
    Other = 3,
}

export type NumberBlock = {
    id: string;
    companyID: string | null;
    company: string | null;
    partnerID: string | null;
    partner: string | null;
    wholesalerID: string | null;
    wholesaler: string | null;
    carrierID?: string | null;
    carrier?: string | null;
    inboundCarrierID?: string | null;
    inboundCarrier?: string | null;
    outboundCarrierID?: string | null;
    outboundCarrier?: string | null;
    blockSize: number;
    pattern?: string | null;
    publicPool?: boolean;
    first: string;
    last: string;
    pendingUpdate?: boolean;
    numberBlockPortingType?: NumberBlockPortingType;
    cliPresentation?: string | null;
    isSpecialNumber?: boolean | null;
    internalNotes?: string | null;
    attribute1?: string | null;
    attribute2?: string | null;
    attribute3?: string | null;
    [key: string]: any;
};

type NumberBlocksState = {
    isLoading: boolean;
    error: string | null;
    success: string | null;
    numberBlocks: NumberBlock[];
    requestIsLoading: boolean;
    requestError: string | null;
    requestSuccess: string | null;
};

const initialState: NumberBlocksState = {
    isLoading: false,
    error: null,
    success: null,
    numberBlocks: [],
    requestIsLoading: false,
    requestError: null,
    requestSuccess: null,
};

const numberBlockSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetNumberBlocksState: (state) => {
            state.isLoading = false;
            state.error = null;
            state.success = null;
            state.numberBlocks = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNumberBlocks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = null;
                state.numberBlocks = [];
            })
            .addCase(fetchNumberBlocks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.numberBlocks = action.payload;
            })
            .addCase(fetchNumberBlocks.rejected, (state, action) => {
                state.isLoading = false;
                state.error =
                    action.error.message ||
                    "There was an unexpected error. Please try again later.";
            })
            .addCase(splitNumberBlocks.pending, (state) => {
                state.requestIsLoading = true;
                state.requestError = null;
                state.requestSuccess = null;
            })
            .addCase(splitNumberBlocks.fulfilled, (state, action) => {
                state.requestIsLoading = false;
                state.requestError = null;
                state.requestSuccess = action.payload.message;
            })
            .addCase(splitNumberBlocks.rejected, (state, action) => {
                state.requestIsLoading = false;
                state.requestSuccess = null;
                state.requestError =
                    action.error.message ||
                    "There was an unexpected error. Please try again later.";
            })
            .addCase(mergeNumberBlocks.pending, (state) => {
                state.requestIsLoading = true;
                state.requestError = null;
                state.requestSuccess = null;
            })
            .addCase(mergeNumberBlocks.fulfilled, (state, action) => {
                state.requestIsLoading = false;
                state.requestError = null;
                state.requestSuccess = action.payload.message;
            })
            .addCase(mergeNumberBlocks.rejected, (state, action) => {
                state.requestIsLoading = false;
                state.requestSuccess = null;
                state.requestError =
                    action.error.message ||
                    "There was an unexpected error. Please try again later.";
            });
    },
});

export const { resetNumberBlocksState } = numberBlockSlice.actions;

export default numberBlockSlice.reducer;
