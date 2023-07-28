import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
  updateOrderTrack,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET,UPDATE_ORDER_TRACK_RESET } from "../../constants/orderConstants";
import "./processOrder.css";
import { CgTrack } from "react-icons/cg";
import { HiChartBar } from "react-icons/hi";

const ProcessOrder = ({ history, match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated, isTracked} = useSelector((state) => state.order);
  const [formData, setFormData] = useState({
    trackId:"",
  });
  const { trackId } = formData;

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(match.params.id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");
  const onChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const onSubmitTrack = async (e) =>{
    e.preventDefault();
    console.log("done")

    const myForm2 = new FormData();

    myForm2.set("trackingId", trackId);

    await dispatch(updateOrderTrack(match.params.id, myForm2));
  }

  useEffect(async () => {
    console.log("har")
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    if(isTracked){
      alert.success("Order Track Id Added Successfully");
      dispatch({ type: UPDATE_ORDER_TRACK_RESET });
    }

    await dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id, isUpdated, updateError, isTracked]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Billing Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Company Name:</p>
                  <span>{order.billingInfo && order.billingInfo.company}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.billingInfo && order.billingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.billingInfo &&
                      `${order.billingInfo.address}, ${order.billingInfo.city}, ${order.billingInfo.state}, ${order.billingInfo.pinCode}, ${order.billingInfo.country}`}
                  </span>
                </div>
                <div>
                  <p>GSTIN:</p>
                  <span>
                    {order.billingInfo && order.billingInfo.GSTIN}
                  </span>
                </div>
                <div>
                  <p>Additional Info:</p>
                  <span>
                    {order.billingInfo && order.billingInfo.additionalInfo}
                  </span>
                </div>
              </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                    <p style={{ "fontWeight" : 600}}>Tracking Id : {order.trackingId ? order.trackingId :""}</p>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
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
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
              <form className="track-form updateOrderForm" onSubmit={onSubmitTrack}>
              <h1 className="process-track">Add Traking Id</h1>
                <div className="form-group">
                <CgTrack />
                    <input
                        type="text"
                        className="form-control track-input-f"
                        placeholder="Enter Tracking ID"
                        name="trackId"
                        value={trackId}
                        onChange={onChange}
                        required
                    />
                </div>
                {order && 
                ( order.trackingId ? 
                <button type="submit" id="createProductBtn"  class="btn btn-primary"> Change Track Id</button>
                 :<button type="submit" id="createProductBtn" class="btn btn-primary">Add</button> ) }
                </form>

                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
