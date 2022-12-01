import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom'; import { FaShoppingCart } from "react-icons/fa";
import NavHeader from '../shared/NavHeader/NavHeader';
import { AuthContext } from '../context/AuthContext/AuthProvider';
import { AiFillFileAdd } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";


const DashboardLayout = () => {

    const { user } = useContext(AuthContext);
    const [loggedUser, setLoggedUser] = useState('');
    // const [admin, setAdmin] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5001/users?users=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setLoggedUser(data);
            })
    }, [user?.email])

    const [admin, setAdmin] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5001/admin`)
            .then(res => res.json())
            .then(data => {
                setAdmin(data[0].email);
                // console.log(data[0].email);
                // console.log(user?.email);
            })
    }, [user?.email])


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
                                    {
                                        admin === user?.email && "Admin"
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
                                        <Link to="/dashboard/seller/myProducts" className="hover:text-warning flex items-center p-2 space-x-3 rounded-md">
                                            <span className='text-lg'><FaShoppingCart></FaShoppingCart></span>
                                            <span>My Products</span>
                                        </Link>
                                        <Link to="/dashboard/seller/addProducts" className="hover:text-warning flex items-center p-2 space-x-3 rounded-md">
                                            <span className='text-lg'><AiFillFileAdd></AiFillFileAdd></span>
                                            <span>Add a Product</span>
                                        </Link>
                                        <Link to="/dashboard/seller/myBuyers" className="hover:text-warning flex items-center p-2 space-x-3 rounded-md">
                                            <span className='text-lg'><BsPeopleFill></BsPeopleFill></span>
                                            <span>My Buyer</span>
                                        </Link>
                                    </>
                                }

                                {
                                    admin === user?.email && <>
                                        <Link to="/dashboard/admin/allBuyers" className="hover:text-warning flex items-center p-2 space-x-3 rounded-md">
                                            <span className='text-lg'><BsPeopleFill></BsPeopleFill></span>
                                            <span>All Buyers</span>
                                        </Link>
                                        <Link to="/dashboard/admin/allSellers" className="hover:text-warning flex items-center p-2 space-x-3 rounded-md">
                                            <span className='text-lg'><BsPeopleFill></BsPeopleFill></span>
                                            <span>All Sellers</span>
                                        </Link>

                                    </>
                                }

                            </li>
                        </ul>
                        <ul className="pt-4 pb-2 space-y-1 text-sm"></ul>
                    </div>
                </div>
                <div className='lg:col-span-10 '>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>

    );
};

export default DashboardLayout;