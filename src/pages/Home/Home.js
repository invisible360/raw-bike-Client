import React from 'react';
import Advertisement from './Advertisement';
import Banner from './Banner';
import ProductCategories from './ProductCategories';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ProductCategories></ProductCategories>
            <Advertisement></Advertisement>
        </div>
    );
};

export default Home;