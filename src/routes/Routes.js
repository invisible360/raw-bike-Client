import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import HomeLayout from "../layout/HomeLayout";
import OtherPageLayout from "../layout/OtherPageLayout";
import CategoryDetailsPage from "../pages/CategoryDetailsPage/CategoryDetailsPage";
import DashboardBuyerMyOrders from "../pages/Dashboard/DashboardBuyerMyOrders";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import SignupSeller from "../pages/Signup/SignupSeller"
import PrivateRoute from "./PrivateRoute";

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
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/sellerSignin',
                element: <SignupSeller></SignupSeller>
            }
        ]
    },
    {
        path: '/categoryDetails/:catName',
        element: <OtherPageLayout></OtherPageLayout>,
        children: [
            {
                path: '/categoryDetails/:catName',
                element: <PrivateRoute><CategoryDetailsPage></CategoryDetailsPage></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5001/bikes?name=${params.catName}`)
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '/dashboard',
                element: <PrivateRoute><DashboardBuyerMyOrders></DashboardBuyerMyOrders></PrivateRoute>,
                loader: () => fetch(`http://localhost:5001/bookings`)
            },
            {
                path: '/dashboard/myOrders',
                element: <PrivateRoute><DashboardBuyerMyOrders></DashboardBuyerMyOrders></PrivateRoute>,
                loader: () => fetch(`http://localhost:5001/bookings`)
            }
        ]
    }
])

export default routes;