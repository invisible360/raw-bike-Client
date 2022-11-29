import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { FcPaid } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthProvider';
import Loader from '../../shared/Loader';

const DashboardBuyerMyOrders = () => {
    const { user } = useContext(AuthContext);

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/bookings?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    })

    const deleteBooking = id => {
        const permission = window.confirm('Are Your Sure Want to Delete?')
        // console.log(id);
        if (permission) {
            fetch(`http://localhost:5001/bookings/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    refetch();
                    toast.success(`Order Deleted Successfully`)
                })
        }
        else {

            toast.success('Item Still in Database');
        }

    }

    if (isLoading) {
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
                                            {
                                                booking.price && !booking.paid && <Link onClick={() => deleteBooking(booking._id)} className='btn btn-error'>X</Link>
                                            }

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
                                            {
                                                booking.price && !booking.paid && <Link
                                                    to={`/dashboard/buyer/payment/${booking._id}`}
                                                >
                                                    <label htmlFor="pay-modal" className="btn btn-success">Pay</label>

                                                </Link>
                                            }
                                            {
                                                booking.price && booking.paid && <div className='flex items-center'>
                                                    <span className='text-green-500 mr-3'>Paid</span> <FcPaid></FcPaid>
                                                </div>
                                            }

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