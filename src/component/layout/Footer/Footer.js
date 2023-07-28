import React from "react";
import { Link } from "react-router-dom";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
import Logo from "../../../images/logo.png";

const Footer = () => {
  return (
    <footer id="footer">
    <div  className="footer-part">
      <div className="footer-main-div">
        <div className="logo-part">
          <img src={Logo} className="logo-img" />
        </div>
        <div className="quick-links">
          <h3>Quick Links</h3>
          <Link to='/' className="home-link">Home</Link>
          <div class="dropdown">
      <button className="our-policies dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Our Policies
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <Link to="/privacy-policy" class="dropdown-item">Privacy Policy</Link>
    <Link to="/return-policy" class="dropdown-item">Refund and Returns Policy</Link>
    <Link to="/terms-condition" class="dropdown-item">Terms & Conditions</Link>
  </div>
</div>
<Link to='/products' className="product-link">Products</Link>
<Link to='/contact' className="contact-link">Contact Us</Link>
        </div>
        <div className="corporate-office">
        <h3>Corporate Office</h3>
        <a href="https://g.page/LOGGER-HOME-DECOR?share" className="address-corporate"><i class="fas fa-map-marker-alt map-f"></i>{" "}55-A, Mohan Nagar II, Iskcon Rd, Mansarovar, Jaipur, Rajasthan 302020</a>
       <p className="phone-footer-no">
       <i class="fas fa-phone-alt phone-f"></i>
       <a href="tel:+919529958624" className='contact-no-2'>{" "}+91 9529958624{", "}</a>
      <a href="tel:+919785332220" className='contact-no-2'>+91 9785332220</a>
       </p>
      <a href="mailto:info@logger-india.com" className='contact-mail-2'><i class="far fa-envelope mail-f"></i>{" "} info@logger-india.com</a>
        </div>
        <div className="map">
        <iframe className="full-map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14241.7122451696!2d75.7520567!3d26.8263341!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xdff262af41b47f41!2sShree%20Shubham%20Sanitation!5e0!3m2!1sen!2sin!4v1641578696152!5m2!1sen!2sin" allowfullscreen="" loading="lazy"></iframe>
        </div>
      </div>
      <div className="copy-right">Copyright © Logger India. All Rights Reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
