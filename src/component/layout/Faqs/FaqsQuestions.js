import React from 'react';
import "./Faqs-question.css";
import Footer from "../Footer/Footer"

const FaqsQuestions = () => {
  return <div className='faqs-questions-div'>
  <h1 className='heading-faqs-question'>Frequently Asked Questions</h1>
    <div className='container all-questions'>
    <div>
    <div className='header-faqs-2'>
        <div>What is your store timings?</div>
            <p>Our store is open from 10.30 AM to 8.00 PM, and we are open from Monday to Sunday</p>
        </div>
                
        <div className='header-faqs-2'>
            <div>How do I place order?</div>
            <p>You can place your order with our website www.logger-india.com</p>
        </div>
        <div className='header-faqs-2'>
            <div>What If I want to order a product but it is out of stock?</div>
            <p>You can place order of product as per your requirement and we can arrange it but the order value and time limit shall be as per conditions.</p>
        </div>
        <div className='header-faqs-2'>
            <div>Is there any return policy?</div>
            <p>Goods once sold cannot be returned back. we take utmost care while packaging our products <br/> and we don’t take responsibility of handling by third party i.e. transporter.</p>
        </div>
    </div>
    <div>
        <div className='header-faqs-2'>
            <div>I live outside Jaipur, how will I get the product?</div>
            <p>We ship across India, We shop through all modes of transportation viz rail,road and air.</p>
        </div>
        <div  className='header-faqs-2'>
                <div>Which Payment Mode you accept?</div>
                <p>We accept payment through all modes viz Paytm,phonepe,UPI,bank etc.</p>
        </div>
        <div className='header-faqs-2'>
                    <div>Is cash on Delivery available?</div>
                    <p>Sorry,Cash on delivery option is not available, we take 100% advance before dispatching a product.</p>
                </div>
                <div className='header-faqs-2'>
                    <div>How long does it take to receive/deliver the product?</div>
                    <p>It depends upon the location of receiver. usually it takes 3-7 days depending upon the location and availability of transport.</p>
                </div>
    </div>          
    </div>
    <Footer />
  </div>;
};

export default FaqsQuestions;
