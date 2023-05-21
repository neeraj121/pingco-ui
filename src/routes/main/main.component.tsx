import React from "react";
import { Outlet } from "react-router-dom";

interface MainProps {}

const Main: React.FC<MainProps> = () => {
    return (
        <main>
            <Outlet />
        </main>
    );
};

export default Main;
