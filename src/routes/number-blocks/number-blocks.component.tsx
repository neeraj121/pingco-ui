import React, { useState, useEffect, useMemo } from "react";
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
    NeutralMessage,
    SuccessMessage,
    Table,
} from "../../styles/elements.styles";
import { ReactComponent as EditSvg } from "../../assets/images/icon-edit.svg";
import { ReactComponent as SplitSvg } from "../../assets/images/icon-split.svg";
import Loading from "../../components/loading/loading.component";
import { selectUser } from "../../store/auth/auth.selector";
import { StyledLink } from "../../styles/elements.styles";

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
    const user = useAppSelector(selectUser);
    const [sortBy, setSortBy] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<string>("asc");

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

    const refreshNumberBlocks = () => {
        dispatch(
            fetchNumberBlocks({
                authToken: user?.token || "",
                wholesalerID: user?.accessDetails?.defaultWholesalerID || "",
            })
        );
        setSelectedBlocks([]);
    };

    useEffect(() => {
        if (user?.accessDetails?.defaultWholesalerID) {
            refreshNumberBlocks();
        }
    }, [user]);

    const filteredNumberBlocks = useMemo(() => {
        if (sortBy && numberBlocks.length > 0 && numberBlocks[0][sortBy]) {
            const sortedNumberBlocks = [...numberBlocks].sort((a, b) => {
                if (a[sortBy] < b[sortBy]) {
                    return sortOrder === "asc" ? -1 : 1;
                }
                if (a[sortBy] > b[sortBy]) {
                    return sortOrder === "asc" ? 1 : -1;
                }
                return 0;
            });
            return sortedNumberBlocks;
        } else {
            return numberBlocks;
        }
    }, [numberBlocks, sortBy, sortOrder]);

    const sortByColumn = (column: string) => {
        if (column === sortBy) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortOrder("asc");
        }
    };

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

    const mergeBlocksHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = async (event) => {
        event.preventDefault();
        const filteredNumberBlocks = selectedBlocks.map(
            (id) => numberBlocks.filter((block) => block.id === id)[0]
        );
        if (filteredNumberBlocks.length === 0) return;

        try {
            if (user?.token) {
                await dispatch(
                    mergeNumberBlocks({
                        authToken: user.token,
                        numberBlocks: filteredNumberBlocks,
                    })
                ).unwrap();
                refreshNumberBlocks();
            }
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
        }
    };

    const splitBlocksHandler = async (id: string) => {
        const selectedBlock = numberBlocks.filter(
            (block) => block.id === id
        )[0];

        try {
            if (user?.token && selectedBlock) {
                await dispatch(
                    splitNumberBlocks({
                        authToken: user.token,
                        numberBlock: selectedBlock,
                    })
                ).unwrap();
                refreshNumberBlocks();
            }
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
        }
    };

    if (!user?.accessDetails?.defaultWholesalerID) {
        return (
            <Container>
                <Card>
                    <CardHeader>
                        <h1>Number Blocks</h1>
                    </CardHeader>
                    <CardBody className="text-center">
                        <ErrorMessage className="text-center">
                            Login Expired. Please login to continue.
                        </ErrorMessage>
                        <StyledLink to="/login">Login</StyledLink>
                    </CardBody>
                </Card>
            </Container>
        );
    }

    return (
        <Container>
            <Card>
                <CardHeader>
                    <h1>Number Blocks</h1>
                </CardHeader>
                <CardBody>
                    {requestIsLoading && <Loading />}
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
                    {requestIsLoading && (
                        <NeutralMessage className="text-center">
                            Loading your request
                        </NeutralMessage>
                    )}
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
                        <NeutralMessage className="text-center">
                            Loading...
                        </NeutralMessage>
                    ) : error ? (
                        <ErrorMessage className="text-center" role="alert">
                            {error}
                        </ErrorMessage>
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
                                            <th
                                                className="sortable"
                                                key={column.key}
                                                onClick={() =>
                                                    sortByColumn(column.key)
                                                }
                                            >
                                                {column.label}{" "}
                                                {sortBy === column.key ? (
                                                    sortOrder === "asc" ? (
                                                        <span>↓</span>
                                                    ) : (
                                                        <span>↑</span>
                                                    )
                                                ) : null}
                                            </th>
                                        ))}
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredNumberBlocks.map((numberBlock) => (
                                        <tr key={numberBlock.id}>
                                            <td data-label="Select: ">
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
                                                <td
                                                    key={column.key}
                                                    data-label={`${column.label}: `}
                                                >
                                                    {column.key in numberBlock
                                                        ? numberBlock[
                                                              column.key
                                                          ]
                                                        : null}
                                                </td>
                                            ))}
                                            <td data-label="Actions: ">
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
