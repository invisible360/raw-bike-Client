import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer/Footer';
import NavHeader from '../shared/NavHeader/NavHeader';

const OtherPageLayout = () => {
    return (
        <div>
            <NavHeader></NavHeader>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default OtherPageLayout;