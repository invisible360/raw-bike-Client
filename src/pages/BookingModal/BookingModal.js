import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthProvider';

const BookingModal = ({ bikeInfoForModal, buyerInfo }) => {
    // treatment is just another name of appointmentOptions with name, slots, _id
    // const { name: treatmentName, slots, price } = treatment;
    // const date = format(selectedDate, 'PP');
    const { user } = useContext(AuthContext);
    console.log(bikeInfoForModal);

    // const handleBooking = event => {
    //     event.preventDefault();
    //     const form = event.target;
    //     const slot = form.slot.value;
    //     const name = form.name.value;
    //     const email = form.email.value;
    //     const phone = form.phone.value;


    // const booking = {
    //     appointmentDate: date,
    //     treatment: treatmentName,
    //     patient: name,
    //     slot,
    //     email,
    //     phone,
    //     price
    // }

    // TODO: send data to the server
    // and once data is saved then close the modal 
    // and display success toast

    // fetch('http://localhost:5000/bookings', {
    //     method: 'POST',
    //     headers: {
    //         'content-type': 'application/json'
    //     },
    //     body: JSON.stringify(booking)
    // })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //         if (data.acknowledged) {
    //             setTreatment(null);
    //             toast.success('Booking confirmed');
    //             refetch();
    //         }
    //         else{
    //             toast.error(data.message);
    //         }
    //     })


    // }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg text-center font-bold">Booking Details</h3>
                    <form className='grid grid-cols-1 gap-3 mt-10'>


                        <input name="email" type="email" disabled defaultValue={buyerInfo} className="input w-full input-bordered" />

                        <input name="name" type="text" disabled defaultValue={user.email} placeholder="Your Name" className="input w-full input-bordered" />


                        <input name="name" type="text" disabled defaultValue={bikeInfoForModal?.name} placeholder="Your Name" className="input w-full input-bordered" />


                        <input name="name" type="text" disabled defaultValue={bikeInfoForModal?.resalePrice} placeholder="Your Name" className="input w-full input-bordered" />

                        <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered" />
                        <input name="phone" type="text" placeholder="Location" className="input w-full input-bordered" />
                        <br />
                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;