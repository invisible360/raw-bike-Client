import React from 'react';

const Advertisement = ({ advertise }) => {
    const { image, name, location, condition, category, price } = advertise
    return (
        <div className='mt-10'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img className='h-96' src={image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{name} <span className='animate-bounce text-orange-500'>in Live</span></h2>
                    <p>Price: ${price}</p>
                    <p>Location: {location}</p>
                    <p>Condition: {condition}</p>
                    <p>Category: {category}</p>

                </div>
            </div>
        </div>
    );
};

export default Advertisement;