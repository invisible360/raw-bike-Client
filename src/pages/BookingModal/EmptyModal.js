import React from 'react';

const EmptyModal = () => {
    return (
        <div>
            
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <label htmlFor="booking-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">Seller is not able to Book</h3>
                    <p className="py-4">If you want to book, Sign Up as a Buyer</p>
                </label>
            </label>
        </div>
    );
};

export default EmptyModal;