import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loader from '../../shared/Loader';

const AdminDashboardAllUsers = () => {

    const { data: buyers = [], isLoading, refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/buyers`);
            const data = await res.json();
            return data;
        }
    })

    const handleDeleteBuyer = (id, email) => {
        const permission = window.confirm('Are Your Sure Want to Delete?')
        // console.log(id);
        if (permission) {
            fetch(`http://localhost:5001/buyer/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.acknowledged) {
                        fetch(`http://localhost:5001/bookings?email=${email}`, {
                            method: 'DELETE'
                        })
                            .then(res => res.json())
                            .then(result => {
                                toast.success(`Buyer Deleted Successfully`)
                                refetch();

                            })
                    }


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
        <div>
            <div className="lg:divide-x lg:divide-gray-700 container p-2 mx-auto sm:p-4 dark:text-gray-100">
                <h2 className="mb-4 text-2xl font-semibold leading-tight text-center my-5">All Buyers</h2>
                <div className="overflow-x-auto">
                    <table className="w-full p-6 text-lg text-left whitespace-nowrap my-5">

                        <thead>
                            <tr className="dark:bg-gray-700">
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                buyers.map(buyer =>
                                    <tr key={buyer._id} className="">
                                        <td className="px-3 py-2">
                                            <p>{buyer.name}</p>
                                        </td>
                                        <td className="px-3 py-2">
                                            <p>{buyer.email}</p>
                                        </td>
                                        <td className="px-3 py-2">
                                            <Link onClick={() => handleDeleteBuyer(buyer._id, buyer.email)} className='btn btn-sm btn-warning'>X</Link>
                                        </td>




                                    </tr>
                                )
                            }


                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardAllUsers;