import React from 'react';
import "./Sustainability.css";

const Sustainability = () => {
    return (
        <div className='sustain-div'>
        
        <h1 className='sustain-heading'>
        <hr className='container'></hr>SUSTAINABILITY
        <hr className='container'></hr>
        </h1>
        <div className='sustain-main-div'>
           <div className='sustain-mission'>
                <div className='image-div'><img src="https://res.cloudinary.com/logger-india/image/upload/v1642168869/frontend-side/mission_tgbjqd.png" /></div>
                <h6>Mission</h6>
                <p>Reach masses with our best-in-class products spanning all price-ranges. Become leaders in bathroom vanity sector by developing superior designs. Providing exception customer services through sales and support and bring pride & joy to homeowners, builders, developers, contractors & architects who use our products.</p>
           </div>
           <div className='sustain-vision'>
           <div className='image-div'><img src="https://res.cloudinary.com/logger-india/image/upload/v1642168884/frontend-side/vision_ae3itp.png" /></div>
                <h6>Vision</h6>
                <p>We envision Logger India as a brand to grow at an exponential level globally, with the ability to meet every desire of the customer need with highest quality standards.</p>
           </div> 
           <div className='sustain-value'>
           <div className='image-div'><img src="https://res.cloudinary.com/logger-india/image/upload/v1642168880/frontend-side/values_zayuoa.png" /></div>
                <h6>Values</h6>
                <p>Today Logger India is available in almost all major cities of the country. Our team is already on mode to expand its dealer/franchise network further in the market ambitiously. It is worth mentioning that Logger India is becoming most favorite & trusted brand among dealers, architects, builders and to the users.</p>
           </div>
        </div>
        </div>
    )
}

export default Sustainability;
