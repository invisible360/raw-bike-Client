import React from 'react';
import { GoVerified } from "react-icons/go";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import BookingModal from '../BookingModal/BookingModal';

const Bike = ({ bike }) => {
    console.log(bike);
    return (
        <div className=''>
            <div className="flex flex-col lg:flex-row max-w-3xl p-6 space-y-4 sm:p-10 bg-gray-50 text-gray-800">

                <ul className="flex flex-col divide-y divide-gray-300">
                    <li className="flex flex-col sm:flex-row sm:justify-between">
                        <div className="flex w-full space-x-2 sm:space-x-4">

                            {/* react photo view */}
                            <PhotoProvider>
                                <PhotoView src={bike.image}>
                                    <img className="flex-shrink-0 object-cover w-20 h-20 border-transparent rounded outline-none sm:w-32 sm:h-32 bg-gray-500" src={bike.image} alt="" />
                                </PhotoView>
                            </PhotoProvider>

                            <div className="flex flex-col justify-between w-full pb-4">
                                <div className="flex justify-between w-full pb-2 space-x-2">
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-semibold leading-snug sm:pr-8">{bike.name}</h3>
                                        <p className="text-sm text-gray-600">{bike.location}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold">${bike.resalePrice}</p>
                                        <p className="">Original Price: <span className='text-sm line-through text-gray-400'>${bike.originalPrice}</span></p>
                                    </div>
                                </div>
                                <div className="flex text-sm divide-x mt-5">
                                    <span type="button" className="flex items-center px-2 py-1 pl-0 space-x-1">Posted Date:</span>
                                    <span type="button" className="flex items-center px-2 space-x-1">Used: {bike.yearsOfUsed} Years</span>
                                </div>
                                <div className='flex flex-col lg:flex-row lg:justify-between'>
                                    <div className='flex items-center'>
                                        <span>Seller: {bike.sellerName}</span>
                                        <span className='text-blue-500 ml-2'><GoVerified></GoVerified></span>
                                    </div>
                                    
                                    <label type="button" htmlFor="booking-modal" className="btn btn-success px-6 py-2 border rounded-md bg-cyan-600 text-gray-50 border-cyan-600">Book Now</label>

                                    <BookingModal></BookingModal>
                                </div>
                            </div>
                        </div>
                    </li>

                </ul>


            </div>
        </div>
    );
};

export default Bike;