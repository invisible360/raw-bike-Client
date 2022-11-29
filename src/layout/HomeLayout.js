import React from 'react';
import { Outlet } from 'react-router-dom';
import Banner from '../pages/Home/Banner';
import Footer from '../shared/Footer/Footer';

const HomeLayout = () => {
    return (
        <div className='min-h-screen'>
            <Banner></Banner>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;