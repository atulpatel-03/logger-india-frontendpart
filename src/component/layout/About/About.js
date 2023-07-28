import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import Footer from "../../layout/Footer/Footer";
import HomeCover from "../../../images/homecover.png";
import OurBrands from "../OurBrands/OurBrands";
import Founders from "../../../images/founders.png";
const About = () => {
  // const visitInstagram = () => {
  //   window.location = "https://instagram.com/meabhisingh";
  // };
  return (
    <div className="aboutSection">
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div className="aboutus-div container">
          <div className="about-div-img">
            <img src={HomeCover} className="aboutus-img"/>
          </div>
          <div className="about-div-para">
            <p>Logger India is a reputed manufacturer of Bathroom Vanities and offers a wide range of designer vanities with various designs & sizes for bathrooms of all kinds. Comfortable, Chic and Captivating- our company has been a pioneer in providing our customers with par excellence and exquisite bathrooms for over two decades. Our team of passionate experts have aspired and succeeded in delivering sustainable, aesthetically pleasing and quality products for an epicurean lifestyle one desires. We offer a wide spectrum of high-end sanitary ware and bathroom solutions, a one-stop shop for all your needs.</p>
          <p>Our vanity includes a set of decorative furniture, faucet and its accessories. The company enjoys the quality known product in the market for innovative designs, exemplary finishes and its durability. Our in-house design teams and craftsmen work and fabricate the product keeping in mind about the client’s specifications and trends prevailing in the market.</p>
          </div>
          
        </div>
        <div className="founers-div-about">
          <h2>THE FOUNDERS</h2>
          <div className="founders-persons">
            <div>
            <img src={Founders} /> 
            <p>XY</p>
            <div>Founder & CEO</div>
            </div>
            <div>
            <img src={Founders} />
            <p>YX</p>
            <div>Founder & Director</div>
            </div>
          </div>
        </div>
        <div className="mission-vision-value">
            <div>
            <div className='image-div-2'><img src="https://res.cloudinary.com/logger-india/image/upload/v1642168869/frontend-side/mission_tgbjqd.png" /></div>
              <div className="heading-mvv">Mission</div>
              <p>Reach masses with our best-in-class products spanning all price-ranges. Become leaders in bathroom vanity sector by developing superior designs. Providing exception customer services through sales and support and bring pride & joy to homeowners, builders, developers, contractors & architects who use our products.</p>
            </div>
            <div>
            <div className='image-div-2'><img src="https://res.cloudinary.com/logger-india/image/upload/v1642168884/frontend-side/vision_ae3itp.png" /></div>
              <div className="heading-mvv">Vision</div>
              <p>We envision Logger India as a brand to grow at an exponential level globally, with the ability to meet every desire of the customer need with highest quality standards.</p>
            </div>
            <div>
            <div className='image-div-2'><img src="https://res.cloudinary.com/logger-india/image/upload/v1642168880/frontend-side/values_zayuoa.png" /></div>
              <div className="heading-mvv">Values</div>
              <p>Today Logger India is available in almost all major cities of the country. Our team is already on mode to expand its dealer/franchise network further in the market ambitiously.

              It is worth mentioning that Logger India is becoming most favorite & trusted brand among dealers, architects, builders and to the users.</p>
            </div>
          </div>
          <hr></hr>
          <OurBrands />
      </div>
      <Footer />
    </div>
  );
};

export default About;
