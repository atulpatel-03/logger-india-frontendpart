import React from 'react';
import "./OfferDetails.css";

const OfferDetails = () => {
    return (
        <div className='offer-detail'>
        <div className='offer-main-div'>
            <div className='shipping-div'>
            <img src="https://res.cloudinary.com/logger-india/image/upload/v1642168876/frontend-side/shipping-br_oooyoq.png" />
                <h2>Shipping across India</h2>
                <p>We ship our products across India through all the modes of transport as per customers convenience</p>
            </div>
            <div className='quality-div'>
            <img src="https://res.cloudinary.com/logger-india/image/upload/v1642168861/frontend-side/bestqu-br_owhmsw.png" />
                <h2>Best Quality</h2>
                <p>Our goal here is to provide High Quality products & services to our customer.</p>
            </div>
            <div className='offer-div'>
            <img src="https://res.cloudinary.com/logger-india/image/upload/v1642168856/frontend-side/best_offer_rywkhl.png" />
                <h2>Best Offers</h2>
                <p>Get Attractive offers and discounts on several products. To avail this offer, Visit Now!</p>
            </div>
        </div>
            
        </div>
    )
}

export default OfferDetails;
