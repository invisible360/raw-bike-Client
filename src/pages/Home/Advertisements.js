import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthProvider';
import Loader from '../../shared/Loader';
import Advertisement from './Advertisement';

const Advertisements = () => {

    const { user } = useContext(AuthContext);


    const { data: advertisements = [], isLoading } = useQuery({
        queryKey: ['advertisements', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/advertisements/${user?.email}`);
            const data = await res.json();
            // console.log(data);
            return data;
        }
    })

    if (isLoading) {
        return <Loader></Loader>
    }



    return (
        <div className='mt-10'>
            <h1 className="text-3xl text-center font-bold">Advertised Products</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 w-[95%] lg:w-full mx-auto'>
                {
                    advertisements.map(advertise => <Advertisement
                        key={advertise._id}
                        advertise={advertise}
                    ></Advertisement>)
                }


            </div>
        </div>
    );
};

export default Advertisements;