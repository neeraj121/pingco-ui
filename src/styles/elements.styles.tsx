import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const buttonStyles = css`
    display: inline-block;
    min-width: 9.375rem;
    padding: 0.5rem 1rem;
    border: 0;
    outline: 0;
    border-radius: 0.25rem;
    text-align: center;
    background: var(--color-primary);
    color: var(--color-white);
    font-weight: 700;
    font-size: 1rem;
    transition: 0.3s all ease-in-out;
    &:hover {
        background: var(--color-accent);
    }
`;

export const Button = styled.button`
    ${buttonStyles}
`;

export const StyledLink = styled(Link)`
    color: var(--color-primary);
`;

export const FormBottom = styled.div`
    text-align: center;
`;

export const Card = styled.div`
    display: block;
    background: var(--color-white);
    border-radius: 0.5rem;
    box-shadow: 0 0 0.6rem 0.1rem rgba(0, 0, 0, 0.25);
`;

export const CardHeader = styled.div`
    background: var(--bg-grey);
    border-bottom: 0.15rem solid var(--border-color);
    padding: 0.5rem 1.5rem;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 0 0;
    }
`;

export const CardBody = styled.div`
    background: var(--white);
    padding: 2rem;

    &:first-child {
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
    }
    &:last-child {
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
    }
`;

export const CardFooter = styled.div`
    background: var(--white);
    padding: 1.125rem 1.25rem;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
`;

export const ErrorMessage = styled.p`
    color: var(--color-red);
    margin: 1rem 0;
`;

export const FieldErrorMessage = styled(ErrorMessage)`
    font-size: 0.75em;
    margin: 0.2rem 0 0;
`;

export const SuccessMessage = styled.p`
    color: var(--color-green);
    margin: 1rem 0;
`;

export const FitIcon = styled.svg`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

type IconButtonProps = {
    background?: string;
    borderRadius?: string;
};
export const IconButton = styled.button<IconButtonProps>`
    display: inline-block;
    position: relative;
    padding: 0.2rem;
    border: 0;
    outline: 0;
    border-radius: ${(props) => props.borderRadius || "0.25rem"};
    background: ${(props) => props.background || "transparent"};

    & > svg {
        width: 1.2rem;
        height: 1.2rem;
        object-fit: contain;
    }
`;

export const Table = styled.table`
    width: 100%;
    border: 1px solid var(--border-color);

    thead {
        background: var(--bg-grey);
    }
    th {
        text-align: left;
        padding: 0.75rem 0.5rem;
        vertical-align: top;
    }
    tr {
        border-bottom: 1px solid var(--border-color);
    }
    td {
        padding: 0.5rem;
        vertical-align: top;
    }
`;
