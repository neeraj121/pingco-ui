import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectNumberBlockSlice } from "../../store/numberBlocks/numberBlocks.selector";
import {
    fetchNumberBlocks,
    mergeNumberBlocks,
    splitNumberBlocks,
} from "../../store/numberBlocks/numberBlocks.action";
import { Container } from "./number-blocks.styles";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    ErrorMessage,
    IconButton,
    SuccessMessage,
    Table,
} from "../../styles/elements.styles";
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
    const {
        isLoading,
        error,
        numberBlocks,
        requestIsLoading,
        requestSuccess,
        requestError,
    } = useAppSelector(selectNumberBlockSlice);
    const [selectedBlocks, setSelectedBlocks] = React.useState<string[]>([]);

    useEffect(() => {
        dispatch(fetchNumberBlocks());
    }, []);

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
        event.preventDefault();
        const filteredNumberBlocks = selectedBlocks.map(
            (id) => numberBlocks.filter((block) => block.id === id)[0]
        );
        if (filteredNumberBlocks.length === 0) return;

        dispatch(mergeNumberBlocks(filteredNumberBlocks));
    };

    const splitBlocksHandler = (id: string) => {
        const selectedBlock = numberBlocks.filter(
            (block) => block.id === id
        )[0];

        if (selectedBlock) {
            dispatch(splitNumberBlocks(selectedBlock));
        }
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
                            <Button
                                onClick={mergeBlocksHandler}
                                disabled={requestIsLoading}
                            >
                                Merge Blocks
                            </Button>
                        </div>
                    </div>
                    {requestSuccess && (
                        <SuccessMessage className="text-center">
                            {requestSuccess}
                        </SuccessMessage>
                    )}
                    {requestError && (
                        <ErrorMessage className="text-center">
                            {requestError}
                        </ErrorMessage>
                    )}
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
                                                    disabled={requestIsLoading}
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
                                                        disabled={
                                                            requestIsLoading
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
