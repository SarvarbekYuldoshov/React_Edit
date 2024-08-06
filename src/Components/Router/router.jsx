import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import App from "../../App";
import Model from "../Model/Model";



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
    }
])
export default router