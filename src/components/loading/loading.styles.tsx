import { styled } from "styled-components";

export const LoadingWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const LoadingGif = styled.img`
    display: block;
    width: 2rem;
    height: 2rem;
    object-fit: contain;
`;
