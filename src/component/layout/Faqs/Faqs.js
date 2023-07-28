import React from 'react';
import {Link} from "react-router-dom";
import "./Faqs.css";
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Faqs = () => {
    return (
        <div className='faqs-div-section'>
            <div className="faqs-second-div">
                <div className='view-all-section'>
                    <h1>FAQs</h1>
                    <p>Questions you probably have but haven’t asked yet</p>
                    <Link to="/faqs" className='btn btn-large view-all-btn'>View All</Link>
                </div>
                <div>
                <AutoplaySlider animation="foldOutAnimation" className="awesome-slider-div" infinite="true" play={true} interval={3000} >
                <div className='header-faqs'>
                    <div>What is your store timings?</div>
                    <p>Our store is open from 10.30 AM to 8.00 PM, and we are open from Monday to Sunday</p>
                </div>
                
                <div className='header-faqs'>
                    <div>How do I place order?</div>
                    <p>You can place your order with our website www.logger-india.com</p>
                </div>
                <div className='header-faqs'>
                    <div>I live outside Jaipur, how will I get the product?</div>
                    <p>We ship across India, We shop through all modes of transportation viz rail,road and air.</p>
                </div>
                
                <div className='header-faqs'>
                    <div>Is there any return policy?</div>
                    <p>Goods once sold cannot be returned back. we take utmost care while packaging our products <br/> and we don’t take responsibility of handling by third party i.e. transporter.</p>
                </div>
                <div  className='header-faqs'>
                <div>Which Payment Mode you accept?</div>
                <p>We accept payment through all modes viz Paytm,phonepe,UPI,bank etc.</p>
                </div>
                <div className='header-faqs'>
                    <div>Is cash on Delivery available?</div>
                    <p>Sorry,Cash on delivery option is not available, we take 100% advance before dispatching a product.</p>
                </div>
                <div className='header-faqs'>
                    <div>How long does it take to receive/deliver the product?</div>
                    <p>It depends upon the location of receiver. usually it takes 3-7 days depending upon the location and availability of transport.</p>
                </div>
  </AutoplaySlider>
                </div>
            </div>
        </div>
    )
}

export default Faqs
