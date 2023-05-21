import React, { ReactNode } from "react";
import { TooltipIcon, TooltipInfo, TooltipStyled } from "./tooltip.styles";
import { ReactComponent as TooltipSvg } from "../../assets/images/tooltip.svg";

interface TooltipProps {
    description: string | ReactNode | ReactNode[];
    color?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ description, color }) => {
    return (
        <TooltipStyled color={color}>
            <TooltipIcon as={TooltipSvg} />
            <TooltipInfo>{description}</TooltipInfo>
        </TooltipStyled>
    );
};

export default Tooltip;
