import styled from "styled-components";
import { FitIcon } from "../../styles/elements.styles";

export const TooltipIcon = styled(FitIcon)`
    #Ellipse_29,
    #_ {
        transition: all 0.3s ease-in-out;
    }
`;

export const TooltipInfo = styled.div`
    position: absolute;
    top: -0.5rem;
    left: 100%;
    margin-left: 0.3rem;
    width: 12rem;
    border-radius: 1.2rem;
    padding: 0.7rem;
    font-size: 0.75rem;
    background: var(--color-accent);
    color: #ffffff;
    text-align: center;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease-in-out;

    &::before {
        content: "";
        position: absolute;
        top: 0.5rem;
        left: -0.25rem;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0.45rem 0.55rem 0.45rem 0;
        border-color: transparent var(--color-accent) transparent transparent;
    }

    @media all and (max-width: 1024px) {
        left: unset;
        right: 100%;
        margin-left: 0;
        margin-right: 0.3rem;

        &::before {
            left: unset;
            right: -0.25rem;
            border-color: transparent transparent transparent
                var(--color-accent);
            border-width: 0.45rem 0 0.45rem 0.55rem;
        }
    }
`;

type TooltipColor = {
    color?: string;
};

export const TooltipStyled = styled.div<TooltipColor>`
    position: absolute;
    top: -0.5rem;
    right: 0;
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    z-index: 3;
    font-weight: 400;

    ${({ color }) => `
        & > ${TooltipIcon} #Ellipse_29 {
            stroke: ${color};
        }
        & > ${TooltipIcon} #_ {
            fill: ${color};
        }
        & > ${TooltipInfo} {
            background: ${color};
            &::before {
                border-color: transparent ${color} transparent transparent;
            }
        }
    `}

    &:hover {
        z-index: 5;
        & > ${TooltipInfo} {
            opacity: 1;
            pointer-events: auto;
        }

        ${({ color }) =>
            !color
                ? `
            & > ${TooltipIcon} #Ellipse_29 {
                stroke: var(--color-accent);
            }

            & > ${TooltipIcon} #_ {
                fill: var(--color-accent);
            }
        `
                : null}
    }
`;
