import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { GoVerified } from 'react-icons/go';
import { Link } from 'react-router-dom';
import Loader from '../../shared/Loader';

const AdminDashboardAllSellers = () => {



    const { data: sellers = [], isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch(`https://raw-bike-server-invisible360.vercel.app/sellers`);
            const data = await res.json();
            return data;
        }
    })

    const handleDeleteSeller = (id, email) => {
        // console.log(email);
        const permission = window.confirm('Are Your Sure Want to Delete?')
        // console.log(id);
        if (permission) {
            fetch(`https://raw-bike-server-invisible360.vercel.app/seller/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.acknowledged) {
                        fetch(`https://raw-bike-server-invisible360.vercel.app/products?email=${email}`, {
                            method: 'DELETE'
                        })
                            .then(res => res.json())
                            .then(result => {
                                toast.success(`Seller Deleted Successfully`)
                                refetch();

                            })
                    }

                })
        }
        else {

            toast.success('Item Still in Database');
        }

    }


    const handleVerifySeller = id => {
        fetch(`https://raw-bike-server-invisible360.vercel.app/sellers/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                toast.success(`Status Changed to Verified`)
                refetch();

            })
    }

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div>
            <div className="lg:divide-x lg:divide-gray-700 container p-2 mx-auto sm:p-4 dark:text-gray-100">
                <h2 className="mb-4 text-2xl font-semibold leading-tight text-center my-5">All Sellers</h2>
                <div className="overflow-x-auto">
                    <table className="w-full p-6 text-lg text-left whitespace-nowrap my-5">

                        <thead>
                            <tr className="dark:bg-gray-700">
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Delete</th>
                                <th className="p-3">Seller Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                sellers.map(seller =>
                                    <tr key={seller._id} className="">
                                        <td className="px-3 py-2">
                                            <p>{seller.name}</p>
                                        </td>
                                        <td className="px-3 py-2">
                                            <p>{seller.email}</p>
                                        </td>
                                        <td className="px-3 py-2">
                                            <Link onClick={() => handleDeleteSeller(seller._id, seller.email)} className='btn btn-sm btn-warning'>X</Link>
                                        </td>
                                        <td className="px-3 py-2">
                                            {
                                                seller.isVerified ?
                                                    <div className='flex items-center'>
                                                        <span className='text-green-600'>Seller Verified</span><span className='text-blue-500 ml-2'><GoVerified></GoVerified></span>
                                                    </div>
                                                    :
                                                    <Link onClick={() => handleVerifySeller(seller._id)} className='btn btn-sm btn-accent'>Verify</Link>
                                            }
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

export default AdminDashboardAllSellers;