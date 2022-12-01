import { useQuery } from '@tanstack/react-query';
import React from 'react';
import BikeCategory from './BikeCategory';

const ProductCategories = () => {

    // const bikeCategories = [
    //     {
    //         _id: 1,
    //         name: "Sports Bikes",
    //         bgColor: "bg-fuchsia-500"
    //     },
    //     {
    //         _id: 2,
    //         name: "Scooters",
    //         bgColor: "bg-lime-500"
    //     },
    //     {
    //         _id: 3,
    //         name: "Ride Sharing Bikes",
    //         bgColor: "bg-teal-500"
    //     },
    // ]

    const { data: bikeCategories = [], refetch } = useQuery({
        queryKey: ['bikeCategories'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/bikeCategories`)
            const data = res.json()
            console.log(data);
            return data

        }
    })

    return (
        <div className='mt-10'>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 w-[95%] lg:w-full mx-auto'>
                {
                    bikeCategories.map(category => <BikeCategory
                        key={category._id}
                        refetch={refetch}
                        category={category}
                    ></BikeCategory>)
                }
            </div>
        </div>
    );
};

export default ProductCategories;