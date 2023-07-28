import React ,{useState } from "react";
import "./Contact.css";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage } from "../../../actions/userAction";
import { useAlert } from "react-alert";
import Footer from "../Footer/Footer";

const Contact = () => {

  const dispatch = useDispatch();

  const alert = useAlert();

const [formData, setFormData] = useState({
  firstname:'',
  lastname:'',
  email:'',
  message:''
});

const { firstname, lastname, email, message } = formData;

const onChange = e =>{
  setFormData({
    ...formData,
    [e.target.name]:e.target.value
  })
}

const onSubmit = async e => {
  e.preventDefault();
  const data={
    firstName:firstname,
    lastName:lastname,
    email:email,
    textMessage:message
  }

  await dispatch(sendMessage(data));
  alert.success("Msg successfully sended");
  setFormData({
    firstname:'',
    lastname:'',
    email:'',
    message:''
  })
}

  return (
    <div>
    <div className="contactContainer">
    <div className="contact-header">
      <h3>Contact US</h3>
      <p>We'd love to hear from you. Here's how you can reach us...</p>
    </div>
    <div className="all-detail">
    <div className="contact-form-div">
    <h4 className="headingForm">Send Us A Message</h4>
    <form className="detailsform" onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
            <input 
              type="text"
              className="form-control name-input-1"
              placeholder="First Name"
              name="firstname"
              value={firstname}
              onChange={onChange}
              required
              />
              <input 
              type="text"
              className="form-control name-input-2"
              placeholder="last Name"
              name="lastname"
              value={lastname}
              onChange={onChange}
              required
              />
          </div>
          <div className="form-group">
          <label>Email</label>
            <input 
              type="email"
              className="form-control"
              placeholder="Enter Email"
              name="email"
              value={email}
              onChange={onChange}
              required
              />
          </div>
          <div className="form-group">
          <label>Message</label>
            {/* <input 
              type="text"
              className="form-control"
              placeholder="Enter Your Message"
              name="message"
              value={message}
              onChange={onChange}
              required
              /> */}
              <textarea rows="5"
               className="form-control"
              placeholder="Enter Your Message"
              name="message"
              value={message}
              onChange={onChange}
              required
               />
          </div>
                    
      <button type="submit" className="btn btn-primary sendbtn" >Send</button>
                
    </form>
    </div>
    <div className="contact-info-div">
    <h4 className="headingContact">Contact Info</h4>
    <div className="address">
    <i class="fas fa-map-marker-alt"></i> 
    <div>
    <h4>Address</h4>
    <a href="https://g.page/LOGGER-HOME-DECOR?share">55-A, Mohan Nagar II, Iskcon Rd, Mansarovar, Jaipur, Rajasthan 302020</a>
    </div>
    </div>
    <div className="phone">
    <i class="fas fa-phone-alt"></i>
    <div>
    <h4>Phone</h4>
    <div>
    <a href="tel:+919529958624" className='contact-no'>+91 9529958624 </a>,
    <a href="tel:+919785332220" className='contact-no'> +91 9785332220</a>
    </div>
    </div>
    </div>
    <div className="mail">
    <i class="fas fa-envelope"></i>
    <div>
    <h4>Email</h4>
        <a className="mail-body" href="mailto:info@logger-india.com">info@logger-india.com</a>
        </div>
    </div>
    <div className="follow-us">
    <h5>Follow Us</h5>
  <i class="fab fa-facebook contact-fb"></i>
  <i class="fab fa-twitter contact-tw"></i>
  <i class="fab fa-instagram contact-in"></i>
  </div>
    </div>
  </div>
    </div>
    <Footer />
    </div>
  );
};

export default Contact;
