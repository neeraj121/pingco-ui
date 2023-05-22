import { NumberBlock } from "../store/numberBlocks/numberBlocks.reducer";

export const checkBlockMergeConditions = (numberBlocks: NumberBlock[]) => {
    if (numberBlocks.length < 2) {
        throw new Error("Must select at least 2 number blocks to merge");
    }

    // Sorting the number blocks
    numberBlocks.sort((a, b) => parseInt(a.first) - parseInt(b.first));
    const currentNumberBlockSize = numberBlocks[0].blockSize;
    if (currentNumberBlockSize === 100) {
        throw new Error("Cannot merge a block of size 100");
    }

    // Check that the array has the right number of number blocks
    // The first block should start with the first number of the block size
    let newBlockSize = 1;
    switch (currentNumberBlockSize) {
        case 10:
            newBlockSize = 100;
            if (numberBlocks.length !== 10) {
                throw new Error(
                    "Must select 10 number blocks of size 10 to merge"
                );
            }
            if (!numberBlocks[0].first.endsWith("00")) {
                throw new Error("A 100 block should run from 00-99");
            }
            break;
        case 5:
            newBlockSize = 10;
            if (numberBlocks.length !== 2) {
                throw new Error(
                    "Must select 2 number blocks of size 5 to merge"
                );
            }
            if (!numberBlocks[0].first.endsWith("0")) {
                throw new Error("A 10 block should run from 0-9");
            }
            break;
        case 1:
            newBlockSize = 5;
            if (numberBlocks.length !== 5) {
                throw new Error(
                    "Must select 5 number blocks of size 1 to merge"
                );
            }
            if (
                !(
                    numberBlocks[0].first.endsWith("0") ||
                    numberBlocks[0].first.endsWith("5")
                )
            ) {
                throw new Error("A 5 block should run from 0-4 or 5-9");
            }
    }

    // Check that all number blocks are the same size and not assigned
    for (let i = 0; i < numberBlocks.length; i++) {
        if (numberBlocks[i].blockSize !== currentNumberBlockSize) {
            throw new Error("Cannot merge number blocks of different sizes");
        }
        if (numberBlocks[i].companyID !== null) {
            throw new Error(
                "Cannot merge number blocks that have been assigned"
            );
        }
        if (
            parseInt(numberBlocks[i].first) !==
            parseInt(numberBlocks[0].first) + i * currentNumberBlockSize
        ) {
            throw new Error("Cannot merge number blocks that are not adjacent");
        }
    }

    return {
        status: true,
        first: numberBlocks[0].first,
        blockSize: newBlockSize,
    };
};
