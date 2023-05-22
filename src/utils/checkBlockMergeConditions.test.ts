import { NumberBlock } from "../store/numberBlocks/numberBlocks.reducer";
import { checkBlockMergeConditions } from "./checkBlockMergeConditions";

describe("checkBlockMergeConditions", () => {
    it("throws an error when selecting less than 2 number blocks", () => {
        const numberBlocks: NumberBlock[] = [
            {
                id: "c5",
                companyID: null,
                company: "",
                partnerID: null,
                partner: "",
                wholesalerID: "a5",
                wholesaler: "",
                blockSize: 100,
                first: "9995632200",
                last: "9995632299",
            },
        ];

        expect(() => {
            checkBlockMergeConditions(numberBlocks);
        }).toThrow("Must select at least 2 number blocks to merge");
    });

    it("throws an error when a block of size 100 is passed", () => {
        const numberBlocks: NumberBlock[] = [
            {
                id: "c5",
                companyID: null,
                company: "",
                partnerID: null,
                partner: "",
                wholesalerID: "a5",
                wholesaler: "",
                blockSize: 10,
                first: "9995632200",
                last: "9995632209",
            },
            {
                id: "9e",
                companyID: null,
                company: "",
                partnerID: null,
                partner: "",
                wholesalerID: "a5",
                wholesaler: "",
                blockSize: 100,
                first: "9995632100",
                last: "9995632199",
            },
        ];

        expect(() => {
            checkBlockMergeConditions(numberBlocks);
        }).toThrow("Cannot merge a block of size 100");
    });

    it("throws an error when the number of blocks selected if incorrect for the merge", () => {
        const numberBlock = {
            id: "c5",
            companyID: null,
            company: "",
            partnerID: null,
            partner: "",
            wholesalerID: "a5",
            wholesaler: "",
            blockSize: 1,
            first: "9995632200",
            last: "9995632209",
        };

        expect(() => {
            checkBlockMergeConditions(
                Array(12)
                    .fill(numberBlock)
                    .map((numberBlock) => ({ ...numberBlock, blockSize: 10 }))
            );
        }).toThrow("Must select 10 number blocks of size 10 to merge");
        expect(() => {
            checkBlockMergeConditions(
                Array(9)
                    .fill(numberBlock)
                    .map((numberBlock) => ({ ...numberBlock, blockSize: 10 }))
            );
        }).toThrow("Must select 10 number blocks of size 10 to merge");

        expect(() => {
            checkBlockMergeConditions(
                Array(6)
                    .fill(numberBlock)
                    .map((numberBlock) => ({ ...numberBlock, blockSize: 5 }))
            );
        }).toThrow("Must select 2 number blocks of size 5 to merge");

        expect(() => {
            checkBlockMergeConditions(
                Array(4)
                    .fill(numberBlock)
                    .map((numberBlock) => ({ ...numberBlock, blockSize: 1 }))
            );
        }).toThrow("Must select 5 number blocks of size 1 to merge");
        expect(() => {
            checkBlockMergeConditions(
                Array(10)
                    .fill(numberBlock)
                    .map((numberBlock) => ({ ...numberBlock, blockSize: 1 }))
            );
        }).toThrow("Must select 5 number blocks of size 1 to merge");
    });

    it("returns true if any of the blocks are assigned", () => {
        const numberBlock = {
            id: "c5",
            companyID: null,
            company: "",
            partnerID: null,
            partner: "",
            wholesalerID: "a5",
            wholesaler: "",
            blockSize: 1,
            first: "9995632200",
            last: "9995632200",
        };
        expect(() => {
            checkBlockMergeConditions(
                Array(5)
                    .fill(numberBlock)
                    .map((numberBlock, index) => ({
                        ...numberBlock,
                        first: (
                            parseInt(numberBlock.first) +
                            index * 2
                        ).toString(),
                        companyID: index === 0 ? "1" : null,
                    }))
            );
        }).toThrow("Cannot merge number blocks that have been assigned");
    });

    it("returns true if the blocks are of different sizes", () => {
        const numberBlocks = [
            {
                id: "c5",
                companyID: null,
                company: "",
                partnerID: null,
                partner: "",
                wholesalerID: "a5",
                wholesaler: "",
                blockSize: 5,
                first: "9995632200",
                last: "9995632204",
            },
            {
                id: "c5",
                companyID: null,
                company: "",
                partnerID: null,
                partner: "",
                wholesalerID: "a5",
                wholesaler: "",
                blockSize: 10,
                first: "9995632210",
                last: "9995632219",
            },
        ];
        expect(() => {
            checkBlockMergeConditions(numberBlocks);
        }).toThrow("Cannot merge number blocks of different sizes");
    });

    it("throws an error when the blocks don't follow the block size pattern", () => {
        const numberBlock = {
            id: "c5",
            companyID: null,
            company: "",
            partnerID: null,
            partner: "",
            wholesalerID: "a5",
            wholesaler: "",
            blockSize: 1,
            first: "9995632200",
            last: "9995632200",
        };

        // Block Size 1
        expect(() => {
            checkBlockMergeConditions(
                Array(5)
                    .fill(numberBlock)
                    .map((numberBlock, index) => ({
                        ...numberBlock,
                        first: (
                            parseInt(numberBlock.first) -
                            index * 1
                        ).toString(),
                    }))
            );
        }).toThrow("A 5 block should run from 0-4 or 5-9");

        // Block Size 5
        expect(() => {
            checkBlockMergeConditions(
                Array(2)
                    .fill(numberBlock)
                    .map((numberBlock, index) => ({
                        ...numberBlock,
                        blockSize: 5,
                        first: (
                            parseInt(numberBlock.first) -
                            index * 5
                        ).toString(),
                    }))
            );
        }).toThrow("A 10 block should run from 0-9");

        // Block Size 10
        expect(() => {
            checkBlockMergeConditions(
                Array(10)
                    .fill(numberBlock)
                    .map((numberBlock, index) => ({
                        ...numberBlock,
                        blockSize: 10,
                        first: (
                            parseInt(numberBlock.first) -
                            index * 10
                        ).toString(),
                    }))
            );
        }).toThrow("A 100 block should run from 00-99");
    });

    it("throws an error when the number blocks are not sequential", () => {
        const numberBlock = {
            id: "c5",
            companyID: null,
            company: "",
            partnerID: null,
            partner: "",
            wholesalerID: "a5",
            wholesaler: "",
            blockSize: 1,
            first: "9995632200",
            last: "9995632200",
        };

        expect(() => {
            checkBlockMergeConditions(
                Array(5)
                    .fill(numberBlock)
                    .map((numberBlock, index) => ({
                        ...numberBlock,
                        first: (
                            parseInt(numberBlock.first) +
                            index * 2
                        ).toString(),
                    }))
            );
        }).toThrow("Cannot merge number blocks that are not adjacent");
    });

    it("returns true if the conditions are met", () => {
        const numberBlock = {
            id: "c5",
            companyID: null,
            company: "",
            partnerID: null,
            partner: "",
            wholesalerID: "a5",
            wholesaler: "",
            blockSize: 1,
            first: "9995632200",
            last: "9995632200",
        };

        // Block Size 1
        const result = checkBlockMergeConditions(
            Array(5)
                .fill(numberBlock)
                .map((numberBlock, index) => ({
                    ...numberBlock,
                    first: (parseInt(numberBlock.first) + index * 1).toString(),
                }))
        );
        expect(result.status).toBeTruthy();

        // Block Size 5
        const result2 = checkBlockMergeConditions(
            Array(2)
                .fill(numberBlock)
                .map((numberBlock, index) => ({
                    ...numberBlock,
                    blockSize: 5,
                    first: (parseInt(numberBlock.first) + index * 5).toString(),
                }))
        );
        expect(result2.status).toBeTruthy();

        // Block Size 10
        const result3 = checkBlockMergeConditions(
            Array(10)
                .fill(numberBlock)
                .map((numberBlock, index) => ({
                    ...numberBlock,
                    blockSize: 10,
                    first: (
                        parseInt(numberBlock.first) +
                        index * 10
                    ).toString(),
                }))
        );
        expect(result3.status).toBeTruthy();
    });
});
