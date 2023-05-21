import React from "react";
import { StyledLink } from "../../styles/elements.styles";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center p-5">
            <StyledLink to="/register">Register</StyledLink>
            or
            <StyledLink to="/login">Login</StyledLink>
            or
            <StyledLink to="/number-blocks">Number Blocks</StyledLink>
        </div>
    );
};

export default Home;
