import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthProvider';
import Bike from './Bike';

const CategoryDetailsPage = () => {

    const catBikes = useLoaderData();

    const [buyerInfo, setBuyerInfo] = useState('');
    const [sellerInfo, setsSellerInfo] = useState({});
    // const [userName, setUsername] = useState('')

    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:5001/users?users=${user.email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);

                if (data.buyer) {
                    setBuyerInfo(data.buyer.name);
                    // setUsername(data.buyer.name);

                }
                else {
                    setsSellerInfo(data.seller);
                    // setUsername(data.seller.name);
                }


            })
    }, [user.email])

    return (
        <div className='w-[95%] mx-auto lg:w-full'>
            <h1 className='text-4xl text-center font-bold my-10'>Bike in this Category: {catBikes.length}</h1>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                {
                    catBikes.map(bike => <Bike
                        key={bike._id}
                        bike={bike}
                        buyerInfo={buyerInfo}
                        sellerInfo={sellerInfo}
                        // userName={userName}
                    ></Bike>)
                }
            </div>
        </div>
    );
};

export default CategoryDetailsPage;