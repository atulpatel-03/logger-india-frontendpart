import React, { Fragment, useState, useEffect } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { getAllCoupon } from "../../actions/couponAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, allCoupon } = useSelector((state) => state.myCoupons);
  const { shippingInfo, cartItems, billingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    couponCode:''
  });

  const [discountAmount, setDiscountAmount] = useState('');
  const [discountTotal, setDiscountTotal] = useState('');
  const [discountGST, setDiscountGST] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [discountCoupon, setDiscountCoupon] = useState('');
  const { couponCode } = formData;

  const onCouponChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tempTax = subtotal * 0.18;
  const tax =(Math.round(tempTax * 100) / 100).toFixed(2);
  const tempTotal = subtotal + tempTax + shippingCharges;
  const totalPrice = (Math.round(tempTotal * 100) / 100).toFixed(2);

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const billingAddress = `${billingInfo.address}, ${billingInfo.city}, ${billingInfo.state}, ${billingInfo.pinCode}, ${billingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
      couponPrice:0,
      couponCode:'',
    };

    const data2 = {
      subtotal:discountAmount,
      tax:discountGST,
      totalPrice:discountTotal,
      couponPrice:discountPercent,
      couponCode:discountCoupon,
      shippingCharges
    }
    var newData = data;
    if(discountAmount){
      newData = data2;
    }

    sessionStorage.setItem("orderInfo", JSON.stringify(newData));

    history.push("/process/payment");
  };
  
  const couponApplied = async () =>{
    const ourCoupon = await allCoupon.filter((t) => t.code === couponCode);
    console.log("before",ourCoupon);
    if(ourCoupon.length === 0){
      alert.error("Coupon is Invalid");
      await dispatch(getAllCoupon());
      setDiscountAmount('');
      setDiscountGST('');
      setDiscountTotal('');
      setDiscountCoupon('');
    }
    else{
      console.log("our coupon",ourCoupon);

      let couponPrice = (subtotal * ourCoupon[0].percent)/100;
      if(couponPrice > ourCoupon[0].uptoAmount){
        couponPrice = ourCoupon[0].uptoAmount;
      }

      let newSubtotal = subtotal - couponPrice;
      let tempNewGST =  newSubtotal * 0.18;
      let newGST =(Math.round(tempNewGST * 100) / 100).toFixed(2);
      let tempNewTotal = newSubtotal + tempNewGST + shippingCharges;
      let newTotal = (Math.round(tempNewTotal * 100) / 100).toFixed(2);
      setDiscountPercent(couponPrice);
      setDiscountAmount(newSubtotal);
      setDiscountTotal(newTotal);
      setDiscountGST(newGST);
      setDiscountCoupon(ourCoupon[0].code);
    }
  }

 useEffect(async () =>{
    if(error){
      alert.error(error);
    }
    await dispatch(getAllCoupon());
    
 },[getAllCoupon])
  

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmshippingArea confirmbillingArea">
            <Typography>Billing Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Company Name:</p>
                <span>{billingInfo.company}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{billingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{billingAddress}</span>
              </div>
              <div>
                <p>GSTIN:</p>
                <span>{billingInfo.GSTIN}</span>
              </div>
              <div>
                <p>Additional Info:</p>
                <span>{billingInfo.additionalInfo}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{discountAmount? discountAmount : subtotal} <br/> <p className={discountAmount ? "discounted" : "not-discounted"} >₹{subtotal}</p></span>
                
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{discountGST? discountGST : tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{discountTotal ? discountTotal : totalPrice}
              <br/> <p className={discountTotal ? "discounted" : "not-discounted"} >₹{totalPrice}</p>
              </span>
            </div>
            <div className="couponCode">
                  <input
                    className="coupon-input"
                    type="text"
                    placeholder="Coupon Code"
                    name="couponCode"
                    value={couponCode}
                    onChange={onCouponChange}
                  />
                  <button className="btn btn-large apply-coupon" onClick={couponApplied}>Apply</button>
                </div>
            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
