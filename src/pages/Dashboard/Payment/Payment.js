import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
// import Loading from '../../Shared/Loading/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const booking = useLoaderData();
    console.log(booking);
    // const navigation = useNavigation();
    const { productName, price, location } = booking;
    // if(navigation.state === "loading"){
    //     return <Loading></Loading>
    // }
    return (
        <div className='lg:col-span-10 '>

            <section>
                <div className="dark:bg-violet-400 border-2">
                    <div className="container flex flex-col items-center  mx-auto text-center  dark:text-gray-900">
                        <h1 className="text-4xl font-bold leading-none sm:text-4xl xl:max-w-3xl dark:text-gray-900"><span className='text-orange-600'>$$</span>Payment Page<span className='text-orange-600'>$$</span></h1>
                        <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-900">You are going to pay for <span className='font-bold text-warning text-4xl'>{productName}</span></p>
                        <div className="flex flex-wrap justify-center">

                            <div className="flex flex-col text-lg font-bold w-full lg:flex-row">
                                <div className="grid flex-grow p-2 card bg-base-300 rounded-box place-items-center">Price: ${price}</div>
                                <div className="divider lg:divider-horizontal"></div>
                                <div className="grid flex-grow p-2 card bg-base-300 rounded-box place-items-center">Location: {location}</div>
                            </div>

                            <div className='w-full my-12'>
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm
                                        booking={booking}
                                    />
                                </Elements>
                            </div>

                        </div>
                    </div>
                </div>
                
            </section>
        </div>
    );
};

export default Payment;