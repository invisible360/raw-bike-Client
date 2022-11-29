import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthProvider';

const SellerAddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const [loggedUser, setLoggedUser] = useState('')

    useEffect(() => {
        fetch(`http://localhost:5001/users?users=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setLoggedUser(data);
            })
    }, [user?.email])



    const bikeCategories = [
        {
            _id: 1,
            name: "Sports Bikes",

        },
        {
            _id: 2,
            name: "Scooters",

        },
        {
            _id: 3,
            name: "Ride Sharing Bikes",

        },
    ]

    const handleAddProduct = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // console.log(imgData.data.url);
                    const product = {
                        sellerName: loggedUser.seller.name,
                        sellerEmail: loggedUser.seller.email,
                        name: data.name,
                        price: data.price,
                        condition: data.condition,
                        category: data.category,
                        mobile: data.mobile,
                        location: data.location,
                        description: data.description,
                        yearOfPurchase: data.purchaseYear,
                        image: imgData.data.url
                    }

                    // save product information to the database
                    fetch('http://localhost:5001/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            // authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.name} is added successfully`);
                            navigate('/dashboard/seller/myProducts')
                        })
                }
            })
    }

    return (
        <div className='flex items-center justify-center'>
            <div className='w-96 lg:w-2/3 p-7'>
                <h2 className="text-4xl text-center mb-5">Add A Product</h2>

                <form onSubmit={handleSubmit(handleAddProduct)}>

                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Product Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Product Name is Required"
                        })} className="input input-bordered w-full" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Price</span></label>
                        <input type="number" {...register("price", {
                            required: true
                        })} className="input input-bordered w-full" />
                        {errors.email && <p className='text-red-500'>{errors.price.message}</p>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Conditions</span></label>
                        <select
                            {...register('condition')}
                            className="select input-bordered w-full">
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                        </select>
                    </div>

                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Category</span></label>
                        <select
                            {...register('category')}
                            className="select input-bordered w-full">
                            {
                                bikeCategories.map(category => <option
                                    key={category._id}
                                    value={category.name}
                                >{category.name}</option>)
                            }
                        </select>
                    </div>

                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Mobile</span></label>
                        <input type="text" {...register("mobile", {
                            required: true
                        })} className="input input-bordered w-full" />
                        {errors.email && <p className='text-red-500'>{errors.mobile.message}</p>}
                    </div>


                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Location</span></label>
                        <input type="text" {...register("location", {
                            required: true
                        })} className="input input-bordered w-full" />
                        {errors.email && <p className='text-red-500'>{errors.location.message}</p>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Year of Purchased</span></label>
                        <input type="number" {...register("purchaseYear", {
                            required: true
                        })} className="input input-bordered w-full" />
                        {errors.email && <p className='text-red-500'>{errors.purchaseYear.message}</p>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Short Description</span></label>
                        <input type="textarea" {...register("description", {
                            required: false
                        })} className="input input-bordered w-full" />
                        {errors.email && <p className='text-red-500'>{errors.description.message}</p>}
                    </div>



                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Photo</span></label>
                        <input type="file" {...register("image", {
                            required: "Photo is Required"
                        })} className="input input-bordered w-full" />
                        {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                    </div>


                    <input className='btn btn-warning w-full mt-4' value="Add Product" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default SellerAddProduct;