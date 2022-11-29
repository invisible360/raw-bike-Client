import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Loader from '../../shared/Loader';

const DashboardBuyerMyOrders = () => {
    const bookings = useLoaderData();
    if (!bookings) {
        return <Loader></Loader>
    }

    return (
        <div className="lg:divide-x lg:divide-gray-700 container p-2 mx-auto sm:p-4 dark:text-gray-100">
            <h2 className="mb-4 text-2xl font-semibold leading-tight text-center my-5">My Orders</h2>
            <div className="overflow-x-auto">
                <table className="w-full p-6 text-lg text-left whitespace-nowrap my-5">

                    <thead>
                        <tr className="dark:bg-gray-700">
                            <th className="p-3">Delete</th>
                            <th className="p-3">Image</th>
                            <th className="p-3">Product Name</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Payment Status</th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking =>
                                <tr key={booking._id} className="">
                                    <td className="px-3 py-2">
                                        <Link to="" className='btn btn-error'>X</Link>
                                    </td>
                                    <td className="px-3 text-2xl font-medium dark:text-gray-400">

                                        <div className="flex-shrink-0 lg:w-56 w-20 mb-6 h-16 lg:h-44 sm:h-32 sm:w-32 sm:mb-0">
                                            <img src={booking.image} alt="" className="object-cover object-center w-full h-full rounded dark:bg-gray-500" />
                                        </div>

                                    </td>
                                    <td className="px-3 py-2">
                                        <p>{booking.productName}</p>
                                    </td>
                                    <td className="px-3 py-2">
                                        <span>${booking.price}</span>

                                    </td>
                                    
                                    <td className="px-3 py-2">
                                        <Link className='btn btn-success'>Pay</Link>
                                    </td>

                                </tr>
                            )
                        }


                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default DashboardBuyerMyOrders;