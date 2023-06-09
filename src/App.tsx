import { RouteObject, useRoutes } from "react-router";
import "./App.css";
import "./assets/css/bootstrap-grid.css";
import Main from "./routes/main/main.component";
import Register from "./routes/register/register.component";
import Home from "./routes/home/home.component";
import Login from "./routes/login/login.component";
import NumberBlocks from "./routes/number-blocks/number-blocks.component";

function App() {
    const routes: RouteObject[] = [
        {
            path: "*",
            element: <Main />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "register",
                    element: <Register />,
                },
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "number-blocks",
                    element: <NumberBlocks />,
                },
            ],
        },
    ];
    const content = useRoutes(routes);
    return content;
}

export default App;
