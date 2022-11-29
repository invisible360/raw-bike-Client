import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthProvider';
import Loader from '../../shared/Loader';

const DashboardSellerMyProducts = () => {
    const { user } = useContext(AuthContext);

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/products?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loader></Loader>
    }



    return (
        <div className='lg:col-span-10 '>
            <div className="l container p-2 mx-auto sm:p-4 dark:text-gray-100">
                <h2 className="mb-4 text-2xl font-semibold leading-tight text-center">My Products</h2>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    {
                        products.map(product =>
                            <div className="">
                                <div className="card bg-base-100 shadow-xl">
                                    <figure><img src={product.image} alt="Shoes" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{product.name}</h2>
                                        <p>Sales Status: Available/Sold</p>
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <p>Seller Name: {product.sellerName}</p>
                                                <p>Condition: {product.condition}</p>
                                                <p>Category: {product.category}</p>
                                            </div>

                                            <div>
                                                <p>Location: {product.location}</p>
                                                <p>Year of Purchased: {product.yearOfPurchase}</p>
                                                <p>Short Description: {product.description}</p>
                                            </div>
                                        </div>
                                        <div className="card-actions justify-between my-2">
                                            <button className="btn btn-primary">Advertise</button>
                                            <button className="btn btn-error btn-circle">X</button>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default DashboardSellerMyProducts;