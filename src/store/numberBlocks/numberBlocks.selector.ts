import { createSelector } from "reselect";
import { RootState } from "../store";

export const selectNumberBlockSlice = (state: RootState) => state.numberBlocks;

export const selectNumberBlocks = createSelector(
    [selectNumberBlockSlice],
    (numberBlocksSlice) => numberBlocksSlice.numberBlocks
);
