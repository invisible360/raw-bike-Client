import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer/Footer';
import NavHeader from '../shared/NavHeader/NavHeader';

const OtherPageLayout = () => {
    return (
        <div className='min-h-screen'>
            <NavHeader></NavHeader>
            <Outlet></Outlet>
            <div className='absolute bottom-0 right-0 left-0  '>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default OtherPageLayout;