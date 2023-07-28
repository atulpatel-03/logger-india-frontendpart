import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Cover1 from "../../../images/cover1.png";
import Cover2 from "../../../images/cover2.png";
import Cover3 from "../../../images/cover3.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./HomeCarousel.css";
// import { CgMouse } from "react-icons/all";

const HomeCarousel = () => {
    return (
        <Carousel autoPlay="true" infiniteLoop="true" interval="2000">
                <div>
                <div className='legend my-legend'>
                <p>Welcome to Logger India</p>
                    <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                View 
              </button>
            </a>
            </div>
                    
                   <img className='carousel-img' src={Cover3} />
                </div>
                <div>
                <div className='legend my-legend'>
                <p>Welcome to Logger India</p>
                    <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                View 
              </button>
            </a>
            </div>
                    <img src={Cover2} />
                </div>
                <div>
                <div className='legend my-legend'>
                <p>Welcome to Logger India</p>
                    <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                View 
              </button>
            </a>
            </div>
                    <img src={Cover1} />
                </div>
            </Carousel>
    )
}

export default HomeCarousel;
