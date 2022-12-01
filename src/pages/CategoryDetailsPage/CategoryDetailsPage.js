import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthProvider';
import useBuyer from '../../hooks/useBuyer';
import Footer from '../../shared/Footer/Footer';
import NavHeader from '../../shared/NavHeader/NavHeader';
import BookingModal from '../BookingModal/BookingModal';
import EmptyModal from '../BookingModal/EmptyModal';
import Bike from './Bike';

const CategoryDetailsPage = () => {

    // http://localhost:5001/bikes?name=${params.catName}

    const catProducts = useLoaderData();
    // console.log(catProducts);

    const { user } = useContext(AuthContext);

    const [isBuyer, isBuyerLoading] = useBuyer(user?.email)
    console.log(isBuyer);

    const [bikeInfoForModal, setBikeInfoForModal] = useState(null);
    const [modal, setModal] = useState(false)
    const [buyerInfo, setBuyerInfo] = useState('');

    console.log({ buyerInfo });



    return (
        <div className='min-h-screen'>
            <NavHeader></NavHeader>
            <div className='w-[95%] mx-auto lg:w-full'>
                <h1 className='text-4xl text-center font-bold my-10'>Bike in this Category: {catProducts.length}</h1>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    {
                        catProducts.map(bike => <Bike
                            key={bike._id}
                            bike={bike}
                            setModal={setModal}
                            buyerInfo={isBuyer}
                            setBuyerInfo={setBuyerInfo}
                            setBikeInfoForModal={setBikeInfoForModal}
                        ></Bike>)


                    }

                    {
                        modal && buyerInfo ? <BookingModal
                            bikeInfoForModal={bikeInfoForModal}
                            buyerInfo={buyerInfo}
                            setModal={setModal}
                        ></BookingModal>
                            :
                            <EmptyModal></EmptyModal>
                    }
                    
                </div>
            </div>
            <div className='absolute bottom-0 right-0 left-0  '>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default CategoryDetailsPage;