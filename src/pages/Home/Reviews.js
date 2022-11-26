import React from 'react';

const Reviews = ({reviews}) => {
    const {details, img, name, location} = reviews;
    return (
        <div>
            <div className="max-w-md p-6 overflow-hidden rounded-lg shadow bg-gray-50 text-gray-800">
                <article>
                    <div className="flex items-center space-x-4">
                        <img src={img} alt="" className="w-10 h-10 rounded-full bg-gray-500" />
                        <div>
                            <h3 className="text-sm font-medium">{name}</h3>
                            <span className="text-sm text-gray-600">{location}</span>
                        </div>
                    </div>
                    <p className="mt-4 text-gray-600">{details}</p>
                </article>
            </div>
        </div>
    );
};

export default Reviews;