import React from 'react';
import Advertisement from './Advertisement';

const Advertisements = () => {



    return (
        <div className='mt-10'>
            <h1 className="text-3xl text-center font-bold">Items On Sale</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 w-[95%] lg:w-full mx-auto'>
                <Advertisement></Advertisement>
                <Advertisement></Advertisement>
                <Advertisement></Advertisement>
            </div>
        </div>
    );
};

export default Advertisements;