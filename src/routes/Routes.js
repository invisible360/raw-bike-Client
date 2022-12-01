import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import HomeLayout from "../layout/HomeLayout";
import Blog from "../pages/Blog";
import CategoryDetailsPage from "../pages/CategoryDetailsPage/CategoryDetailsPage";
import AdminDashboardAllSellers from "../pages/Dashboard/AdminDashboardAllSellers";
import AdminDashboardAllUsers from "../pages/Dashboard/AdminDashboardAllUsers";
import DashboardBuyerMyOrders from "../pages/Dashboard/DashboardBuyerMyOrders";
import DashboardSellerMyProducts from "../pages/Dashboard/DashboardSellerMyProducts";
import Payment from "../pages/Dashboard/Payment/Payment";
import SellerAddProduct from "../pages/Dashboard/SellerAddProduct";
import Home from "../pages/Home/Home";
import AdminSignUp from "../pages/Login/AdminSignUp";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import SignupSeller from "../pages/Signup/SignupSeller"
import DisplayError from "../shared/DisplayError";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout></HomeLayout>,
        errorElement: <DisplayError></DisplayError>,
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
        path: '/categoryDetails/:id',
        element: <PrivateRoute><CategoryDetailsPage></CategoryDetailsPage></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5001/catProducts/${params.id}`),
        // errorElement: <DisplayError></DisplayError>

    },
    {
        path: '/dashboard/buyer',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard/buyer',
                element: <DashboardBuyerMyOrders></DashboardBuyerMyOrders>
            },
            {
                path: '/dashboard/buyer/myOrders',
                element: <DashboardBuyerMyOrders></DashboardBuyerMyOrders>
            },
            {
                path: '/dashboard/buyer/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`http://localhost:5001/bookings/${params.id}`)
            }
        ]
    },
    {
        path: '/dashboard/seller',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard/seller',
                element: <DashboardSellerMyProducts></DashboardSellerMyProducts>
            },
            {
                path: '/dashboard/seller/myProducts',
                element: <DashboardSellerMyProducts></DashboardSellerMyProducts>
            },
            {
                path: '/dashboard/seller/addProducts',
                element: <SellerAddProduct></SellerAddProduct>
            }
        ]
    },
    {
        path: '/blog',
        element: <Blog></Blog>,
        errorElement: <DisplayError></DisplayError>,
    },
    {
        path: '/adminLogin',
        element: <AdminSignUp></AdminSignUp>,
        errorElement: <DisplayError></DisplayError>,
    },
    {
        path: '/dashboard/admin',
        element: <DashboardLayout></DashboardLayout>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard/admin',
                element: <AdminRoute><AdminDashboardAllUsers></AdminDashboardAllUsers></AdminRoute>
            },
            {
                path: '/dashboard/admin/allBuyers',
                element: <AdminDashboardAllUsers></AdminDashboardAllUsers>
            },
            {
                path: '/dashboard/admin/allSellers',
                element: <AdminDashboardAllSellers></AdminDashboardAllSellers>
            }
        ]
    }
])

export default routes;