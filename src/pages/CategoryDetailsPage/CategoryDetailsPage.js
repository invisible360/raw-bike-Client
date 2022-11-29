import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthProvider';
import BookingModal from '../BookingModal/BookingModal';
import EmptyModal from '../BookingModal/EmptyModal';
import Bike from './Bike';

const CategoryDetailsPage = () => {

    const catBikes = useLoaderData();

    const [bikeInfoForModal, setBikeInfoForModal] = useState(null);
    const [modal, setModal] = useState(false)
    const [buyerInfo, setBuyerInfo] = useState('');
    const [sellerInfo, setsSellerInfo] = useState({});
    // const [userName, setUsername] = useState('');



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
                        setModal={setModal}
                        setBikeInfoForModal={setBikeInfoForModal}
                    ></Bike>)
                }

                {
                    Object.keys(sellerInfo).length > 0 ?
                        <>
                            <EmptyModal></EmptyModal>
                        </>
                        :
                        <>
                            {
                                modal &&
                                <BookingModal
                                    bikeInfoForModal={bikeInfoForModal}
                                    setModal={setModal}
                                    buyerInfo={buyerInfo}
                                ></BookingModal>
                            }
                        </>
                }
            </div>
        </div>
    );
};

export default CategoryDetailsPage;