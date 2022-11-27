import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import OtherPageLayout from "../layout/OtherPageLayout";
import CategoryDetailsPage from "../pages/CategoryDetailsPage/CategoryDetailsPage";
import Home from "../pages/Home/Home";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            }
        ]
    },
    {
        path: '/categoryDetails/:catName',
        element: <OtherPageLayout></OtherPageLayout>,
        children: [
            {
                path: '/categoryDetails/:catName',
                element: <CategoryDetailsPage></CategoryDetailsPage>,
                loader: ({ params }) => fetch(`http://localhost:5001/bikes?name=${params.catName}`)
            }
        ]
    }
])

export default routes;