import { createBrowserRouter } from "react-router-dom";
import CategoryDetailsPage from "../pages/CategoryDetailsPage/CategoryDetailsPage";
import Home from "../pages/Home/Home";

export const routes = createBrowserRouter ([
    {
        path:'/',
        element: <Home></Home>
    },
    {
        path: '/category/:id',
        element: <CategoryDetailsPage></CategoryDetailsPage>
    }

])