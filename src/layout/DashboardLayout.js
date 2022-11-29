import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom'; import { FaShoppingCart } from "react-icons/fa";
import NavHeader from '../shared/NavHeader/NavHeader';
import { AuthContext } from '../context/AuthContext/AuthProvider';
const DashboardLayout = () => {

    const { user } = useContext(AuthContext);
    const [loggedUser, setLoggedUser] = useState('')

    useEffect(() => {
        fetch(`http://localhost:5001/users?users=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setLoggedUser(data);
            })
    }, [user.email])


    return (
        <div>
            <NavHeader></NavHeader>
            <div className='grid lg:grid-cols-12'>
                <div className="lg:col-span-2 h-full p-3 space-y-2 w-full lg:w-60 dark:bg-gray-900 dark:text-gray-100">
                    <div className="flex items-center p-2 space-x-4">
                        <img src="https://www.freeiconspng.com/uploads/dashboard-icon-32.png" alt="" className="w-12 h-12 dark:bg-gray-500" />
                        <div>
                            <h2 className="text-lg font-semibold">Dashboard</h2>
                            <span className="flex items-center space-x-1">
                                <span className=" text-xs">
                                    {
                                        loggedUser.buyer && "Buyer"

                                    }
                                    {
                                        loggedUser.seller && "Seller"
                                    }
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-700 lg:divide-y-0 ">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="dark:bg-gray-800 lg:divide-y-2 lg:divide-gray-700  dark:text-gray-50 flex lg:block">
                                {
                                    loggedUser.buyer && <>
                                        <Link to="/dashboard/buyer/myOrders" className="hover:text-warning flex items-center p-2 space-x-3 rounded-md">
                                            <span className='text-lg'><FaShoppingCart></FaShoppingCart></span>
                                            <span>My Orders</span>
                                        </Link>
                                    </>
                                }

                                {
                                    loggedUser.seller && <>
                                        <Link to="/dashboard/sellers/myProducts" className="hover:text-warning flex items-center p-2 space-x-3 rounded-md">
                                            <span className='text-lg'><FaShoppingCart></FaShoppingCart></span>
                                            <span>My Products</span>
                                        </Link>
                                        <Link to="/dashboard/sellers/addProducts" className="hover:text-warning flex items-center p-2 space-x-3 rounded-md">
                                            <span className='text-lg'><FaShoppingCart></FaShoppingCart></span>
                                            <span>Add a Product</span>
                                        </Link>
                                        <Link to="/dashboard/sellers/myBuyers" className="hover:text-warning flex items-center p-2 space-x-3 rounded-md">
                                            <span className='text-lg'><FaShoppingCart></FaShoppingCart></span>
                                            <span>My Buyer</span>
                                        </Link>
                                    </>
                                }

                            </li>
                        </ul>
                        <ul className="pt-4 pb-2 space-y-1 text-sm"></ul>
                    </div>
                </div>
                <Outlet></Outlet>
            </div>
        </div>

    );
};

export default DashboardLayout;