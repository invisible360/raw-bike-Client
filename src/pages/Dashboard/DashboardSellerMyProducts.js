import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext/AuthProvider';
import Loader from '../../shared/Loader';

const DashboardSellerMyProducts = () => {
    const { user } = useContext(AuthContext);
    // const [advertiseDisable, setAdvertiseDisable] = useState(false);

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/products?email=${user?.email}`);
            const data = await res.json();

            return data;
        }
    })



    const handlAdvertiseProduct = product => {
        console.log(product);
        const advertiseProduct = {
            sellerName: product.sellerName,
            id: product._id,
            sellerEmail: product.sellerEmail,
            name: product.name,
            price: product.price,
            condition: product.condition,
            category: product.category,
            mobile: product.mobile,
            location: product.location,
            description: product.description,
            yearOfPurchase: product.purchaseYear,
            image: product.image
        }

        fetch('http://localhost:5001/advertiseProducts', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(advertiseProduct)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.acknowledged) {
                    toast.success('Advertise Posted Successfully');
                    fetch(`http://localhost:5001/products/${product._id}`, {
                        method: "PUT",
                        headers: {
                            "content-type": "application/json"
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            refetch();
                        })

                }
            })

    }

    const deleteBooking = id => {
        const permission = window.confirm('Are Your Sure Want to Delete?')

        if (permission) {
            fetch(`http://localhost:5001/productsAndadvertise/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    refetch();
                    toast.success(`Product Deleted Successfully`)
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
        <div className='lg:col-span-10 '>
            <div className="l container p-2 mx-auto sm:p-4 dark:text-gray-100">
                <h2 className="mb-4 text-2xl font-semibold leading-tight text-center">My Products</h2>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    {
                        products.map(product =>
                            <div key={product._id} className="">
                                <div className="card bg-base-100 shadow-xl lg:h-[650px]">
                                    <figure><img className='h-96' src={product.image} alt="Shoes" /></figure>
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
                                            <button disabled={product.status && true} onClick={() => handlAdvertiseProduct(product)} className="btn btn-primary">{product.status ? 'Advertised' : 'Advertise'}</button>
                                            <button onClick={() => deleteBooking(product._id)} className="btn btn-error btn-circle">X</button>
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