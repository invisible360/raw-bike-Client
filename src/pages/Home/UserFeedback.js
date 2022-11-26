import React from 'react';
import placeholder from '../../assets/placeholder.png';
import Reviews from './Reviews';


const UserFeedback = () => {
    const testimonials = [
        {
            _id: 1,
            img: placeholder,
            name: "Abdul Rahman",
            location: "Dhaka",
            details: "Trusted Site to Sell and Buy Bikes"
        },
        {
            _id: 2,
            img: placeholder,
            name: "Abdul Kalam",
            location: "Khulna",
            details: "Authentic Service"
        },
        {
            _id: 3,
            img: placeholder,
            name: "Rakib Hasan",
            location: "Mymensing",
            details: "Good Condition Yamha FZ-s Bought Last Week"
        }
    ]

    return (
        <div className='my-10 mx-10 lg:mx-0'>
                <div className='font-bold text-center'>
                    <h1 className="text-2xl lg:text-3xl divider my-10">User's Feedback</h1>
                </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 '>
                {
                    testimonials.map(reviews => <Reviews
                        key={reviews._id}
                        reviews={reviews}
                    ></Reviews>)
                }
            </div>


        </div>
    );

};

export default UserFeedback;