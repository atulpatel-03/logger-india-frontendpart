import React from 'react';
import "./VirtualTour.css";

const VirtualTour = () => {
    return (
        <div className='virtual-div'>
            <h1 className='virtual-heading container'>Virtual Tour</h1>
            <div className='view-virtual'>
            <div className='btn btn-lagre my-virtual-button'>
            <i class="far fa-hand-pointer"></i>Click to View in Full Screen</div>
            </div>
        </div>
    )
}

export default VirtualTour
