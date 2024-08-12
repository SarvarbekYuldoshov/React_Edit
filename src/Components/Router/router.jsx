import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import App from "../../App";
import Model from "../Model/Model";
import Menu from "../Menu/Menu";
import Brands from "../Brands/Brands";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/home",
        element: <Home/>,
    },
    {
        path: "/model",
        element: <Model/>,
    },
    {
        path: "/brands",
        element: <Brands/>,
    },
    {
        path: "/menu",
        element: <Menu/>,
    }
])
export default router