import React from 'react';
import Advertisements from './Advertisements';
import ProductCategories from './ProductCategories';
import UserFeedback from './UserFeedback';

const Home = () => {
    return (
        <div>
            <ProductCategories></ProductCategories>
            <Advertisements></Advertisements>
            <UserFeedback></UserFeedback>
        </div>
    );
};

export default Home;