import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Bike from './Bike';

const CategoryDetailsPage = () => {

    const catBikes = useLoaderData();

    return (
        <div className='w-[95%] mx-auto lg:w-full'>
            <h1 className='text-4xl text-center font-bold my-10'>Bike in this Category: {catBikes.length}</h1>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                {
                    catBikes.map(bike => <Bike
                        key={bike._id}
                        bike={bike}
                    ></Bike>)
                }
            </div>
        </div>
    );
};

export default CategoryDetailsPage;