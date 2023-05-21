import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectNumberBlockSlice } from "../../store/numberBlocks/numberBlocks.selector";
import { fetchNumberBlocks } from "../../store/numberBlocks/numberBlocks.action";
import { Container } from "./number-blocks.styles";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    ErrorMessage,
    IconButton,
    Table,
} from "../../styles/elements.styles";
import { NumberBlock } from "../../store/numberBlocks/numberBlocks.reducer";
import { ReactComponent as EditSvg } from "../../assets/images/icon-edit.svg";
import { ReactComponent as SplitSvg } from "../../assets/images/icon-split.svg";

interface NumberBlocksProps {}

const columnsToDisplay = [
    {
        key: "partner",
        label: "Partner",
    },
    {
        key: "company",
        label: "Company",
    },
    {
        key: "blockSize",
        label: "Block Size",
    },
    {
        key: "first",
        label: "First Number",
    },
    {
        key: "last",
        label: "Last Number",
    },
    {
        key: "inboundCarrier",
        label: "Inbound Carrier",
    },
    {
        key: "outboundCarrier",
        label: "Outbound Carrier",
    },
];

const NumberBlocks: React.FC<NumberBlocksProps> = () => {
    const dispatch = useAppDispatch();
    const { isLoading, error } = useAppSelector(selectNumberBlockSlice);
    const numberBlocks: NumberBlock[] = [
        {
            id: "c59426fa-2dbc-4217-ca5d-08db5805364f",
            companyID: null,
            company: "",
            partnerID: null,
            partner: "",
            wholesalerID: "a589ebfe-a55d-4f5e-4f42-08db5770e770",
            wholesaler: "Neeraj IPWS",
            carrierID: "d340a23c-ee4e-4f08-b626-08d7010900d1",
            carrier: "Default Carrier",
            inboundCarrierID: "d340a23c-ee4e-4f08-b626-08d7010900d1",
            inboundCarrier: "Default Carrier",
            outboundCarrierID: "d340a23c-ee4e-4f08-b626-08d7010900d1",
            outboundCarrier: "Default Carrier",
            blockSize: 100,
            pattern: null,
            publicPool: false,
            first: "9995632200",
            last: "9995632299",
            pendingUpdate: false,
            numberBlockPortingType: 0,
            cliPresentation: "",
            isSpecialNumber: false,
            internalNotes: null,
            attribute1: null,
            attribute2: null,
            attribute3: null,
        },
        {
            id: "9eb64672-a781-41cf-ca5e-08db5805364f",
            companyID: null,
            company: "",
            partnerID: null,
            partner: "",
            wholesalerID: "a589ebfe-a55d-4f5e-4f42-08db5770e770",
            wholesaler: "Neeraj IPWS",
            carrierID: "d340a23c-ee4e-4f08-b626-08d7010900d1",
            carrier: "Default Carrier",
            inboundCarrierID: "d340a23c-ee4e-4f08-b626-08d7010900d1",
            inboundCarrier: "Default Carrier",
            outboundCarrierID: "d340a23c-ee4e-4f08-b626-08d7010900d1",
            outboundCarrier: "Default Carrier",
            blockSize: 100,
            pattern: null,
            publicPool: false,
            first: "9995632100",
            last: "9995632199",
            pendingUpdate: false,
            numberBlockPortingType: 0,
            cliPresentation: "",
            isSpecialNumber: false,
            internalNotes: null,
            attribute1: null,
            attribute2: null,
            attribute3: null,
        },
    ];
    const [selectedBlocks, setSelectedBlocks] = React.useState<string[]>([]);

    // useEffect(() => {
    //     dispatch(
    //         fetchNumberBlocks({
    //             wholesalerID: process.env.REACT_APP_WHOLESALER_ID || "",
    //             token: "",
    //         })
    //     );
    // }, []);

    const handleSelectAllChange: React.ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        if (event.target.checked) {
            setSelectedBlocks(numberBlocks.map((block) => block.id));
        } else {
            setSelectedBlocks([]);
        }
    };

    const handleIndividualSelectionChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        id: string
    ) => {
        if (event.target.checked) {
            setSelectedBlocks([...selectedBlocks, id]);
        } else {
            setSelectedBlocks(selectedBlocks.filter((block) => block !== id));
        }
    };

    const mergeBlocksHandler: React.MouseEventHandler<HTMLButtonElement> = (
        event
    ) => {
        console.log("Merge Blocks");
        console.log(selectedBlocks);
    };

    const splitBlocksHandler = (id: string) => {
        const selectedBlock = numberBlocks.filter(
            (block) => block.id === id
        )[0];
        console.log(selectedBlock);
    };

    return (
        <Container>
            <Card>
                <CardHeader>
                    <h1>Number Blocks</h1>
                </CardHeader>
                <CardBody>
                    <div className="row justify-content-end mb-3">
                        <div className="col-auto">
                            <Button onClick={mergeBlocksHandler}>
                                Merge Blocks
                            </Button>
                        </div>
                    </div>
                    {isLoading ? (
                        <div className="text-center">Loading...</div>
                    ) : error ? (
                        <ErrorMessage role="alert">{error}</ErrorMessage>
                    ) : (
                        <div>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>
                                            <input
                                                type="checkbox"
                                                onChange={handleSelectAllChange}
                                                title="Select All"
                                            />
                                        </th>
                                        {columnsToDisplay.map((column) => (
                                            <th key={column.key}>
                                                {column.label}
                                            </th>
                                        ))}
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {numberBlocks.map((numberBlock) => (
                                        <tr key={numberBlock.id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    title="Select Block"
                                                    onChange={(event) =>
                                                        handleIndividualSelectionChange(
                                                            event,
                                                            numberBlock.id
                                                        )
                                                    }
                                                    checked={
                                                        selectedBlocks.indexOf(
                                                            numberBlock.id
                                                        ) !== -1
                                                    }
                                                />
                                            </td>
                                            {columnsToDisplay.map((column) => (
                                                <td key={column.key}>
                                                    {column.key in numberBlock
                                                        ? numberBlock[
                                                              column.key
                                                          ]
                                                        : null}
                                                </td>
                                            ))}
                                            <td>
                                                <IconButton
                                                    className="me-2"
                                                    title="Edit Block"
                                                >
                                                    <EditSvg />
                                                </IconButton>
                                                {numberBlock.blockSize > 1 && (
                                                    <IconButton
                                                        className="me-2"
                                                        title="Split Block"
                                                        onClick={() =>
                                                            splitBlocksHandler(
                                                                numberBlock.id
                                                            )
                                                        }
                                                    >
                                                        <SplitSvg />
                                                    </IconButton>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </CardBody>
            </Card>
        </Container>
    );
};

export default NumberBlocks;
