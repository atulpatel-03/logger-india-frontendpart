import React, {Fragment, useState } from 'react';
import "./Navbar.css";
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import Logo from "../../../../images/logo.png";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../../../actions/userAction";
import { useAlert } from "react-alert";

const Navbar = ({ history }) => {
  const { isAuthenticated} = useSelector((state) => state.user);
    const [keyword, setKeyword] = useState("");
    const alert = useAlert();
    const dispatch = useDispatch();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
    setKeyword("");
  };

  const onLogout = () =>{
    dispatch(logout());
    alert.success("Logout Successfully");
  }

    return (
      <Fragment>
      <nav class="navbar navbar-expand-lg navbar-light bg-transparent my-navbar-2">
      <div className='details-info'>
      <a href="mailto:info@logger-india.com" className='contact-mail'>info@logger-india.com</a>
      <a href="tel:+919529958624" className='contact-no'>+91 9529958624</a>
      <a href="tel:+919785332220" className='contact-no'>+91 9785332220</a>
      {/* <p className='gstin'>GSTIN : 08ABRPA9510F1ZP</p> */}
      </div>
    <form className="form-inline my-2 my-lg-0 search-form ml-auto" onSubmit={searchSubmitHandler}>
        <input
        className='form-control mr-sm-2'
          type="search"
          value={keyword}
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
       <button type="submit" class="btn btn-outline-primary my-2 my-sm-0" ><i class="fas fa-search"></i></button>
      </form>
      { isAuthenticated === false ? <Link to='/login' className="btn btn-large btn-primary sign-in-btn">SignUp/Login <i class="fas fa-sign-in-alt"></i></Link>
      : <button className="btn btn-large" onClick={onLogout}>Logout <i class="fas fa-sign-out-alt"></i></button>}
</nav>
        <nav class="navbar navbar-expand-lg navbar-light bg-transparent my-navbar">
  <Link to="/"><img className='logo' src={Logo} /></Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
    <li class="nav-item">
        <Link to='/' class="nav-link">Home</Link>
      </li>
      <li class="nav-item">
        <Link to='/products' class="nav-link">Products</Link>
      </li>
      <li class="nav-item">
      <Link to='/contact' class="nav-link">Contact</Link>
      </li>
      <li class="nav-item">
      <Link to='/about' class="nav-link">About</Link>
      </li>
      <li class="nav-item">
      <Link to='/search' class="nav-link search-icon-phone">Search <i class="fas fa-search"></i></Link>
      </li>
      <li class="nav-item">
      <Link to='/cart' class="nav-link">Cart <i class="fas fa-shopping-cart"></i></Link>
      </li>
      { isAuthenticated === false ? 
      <li>
      <Link to='/login' className="btn btn-large btn-primary onli-phone">SignUp/Login <i class="fas fa-sign-in-alt"></i></Link>
      </li>
      : 
      <li>
      <button className="btn btn-large onli-phone" onClick={onLogout}>Logout <i class="fas fa-sign-out-alt"></i></button>
      </li>}
    </ul>
  </div>
</nav>
</Fragment>
    )
}

export default withRouter(Navbar);
