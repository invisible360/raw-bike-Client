import React from 'react';
import { Link } from 'react-router-dom';

const BikeCategory = ({ category }) => {
    return (
        <Link to={`/categoryDetails/${category._id}`}>
            <div className={`card ${category.bgColor} text-neutral-content transition ease-in-out duration-200 hover:scale-105 hover:transition hover:ease-in-out hover:duration-200`}>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{category.name}</h2>
                    <p>Click to See Different Types under this categories</p>
                </div>
            </div>
        </Link>
    );
};

export default BikeCategory;