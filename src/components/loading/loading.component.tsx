import React from "react";
import { LoadingGif, LoadingWrapper } from "./loading.styles";
import LoadingSrc from "../../assets/images/loading.gif";

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
    return (
        <LoadingWrapper>
            <LoadingGif src={LoadingSrc} />
        </LoadingWrapper>
    );
};

export default Loading;
