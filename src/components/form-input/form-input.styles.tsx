import styled from "styled-components";
import { TooltipStyled } from "../tooltip/tooltip.styles";

export const FormInputWrapper = styled.div`
    position: relative;
    flex-grow: 1;

    & > ${TooltipStyled} {
        top: 50%;
        transform: translateY(-50%);
        right: 1rem;
    }
`;

export const FormInputStyled = styled.input`
    display: block;
    width: 100%;
    background-color: var(--white);
    padding: 1.2rem 1rem;
    border-radius: 0.25rem;
    border: 0.1rem solid var(--border-color);
    transition: border-color 0.1s ease-in-out;
    &:focus {
        outline: none;
        border-color: var(--color-primary);
    }
`;

export const LabelStyled = styled.label`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    display: flex;
    padding: 1rem 1rem;
    border: 1px solid transparent;
    flex-direction: column;
    justify-content: center;
    transition: all 0.1s ease-in-out;
`;

export const ShowPasswordIcon = styled.img`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1.25rem;
    width: 1.25rem;
    height: auto;
    cursor: pointer;
    z-index: 3;
    opacity: 0.85;
    transition: all 0.1s ease-in-out;

    &:hover {
        opacity: 1;
    }
`;

export const GroupWrapper = styled.div`
    position: relative;

    &.in-focus {
        & ${LabelStyled} {
            padding: 0.2rem 1rem;
            font-size: 0.6em;
            opacity: 0.75;
        }

        & ${FormInputStyled} {
            padding: 1.4rem 1rem 1rem;
        }
    }
`;
