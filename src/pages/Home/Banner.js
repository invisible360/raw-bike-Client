import React from 'react';
import banner from '../../assets/cover.jpg'
import NavHeader from '../../shared/NavHeader/NavHeader';

const Banner = () => {
    return (

        <div className="hero h-96 lg:h-[420px] relative" style={{ backgroundImage: `url(${banner})` }}>
            <div className='navbar absolute top-0 shadow-2xl'>
                <NavHeader></NavHeader>
            </div>

            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center">
                <div className="max-w-md text-white absolute top-28">
                    <h1 className="mb-5 text-4xl font-bold">Welcome to <br className='lg:hidden'></br> <span className='animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 text-4xl font-extrabold to-success'>Raw Bike</span></h1>
                    <p className="mb-5">But and Sell Your Used Bike Here.</p>
                    
                </div>
            </div>
        </div>
    );
};

export default Banner;