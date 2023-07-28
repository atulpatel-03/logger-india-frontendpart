import React, { Fragment, useEffect, useRef, useState } from "react"
import CheckoutSteps from "../Cart/CheckoutSteps"
import { useSelector, useDispatch } from "react-redux"
import MetaData from "../layout/MetaData"
import { Typography } from "@material-ui/core"
import { useAlert } from "react-alert"
import Logo from "../../images/logo.png"
import axios from "axios"
import "./payment.css"
import CreditCardIcon from "@material-ui/icons/CreditCard"
import EventIcon from "@material-ui/icons/Event"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import { createOrder, clearErrors } from "../../actions/orderAction"
import api from "../../utils/api"

const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))

  const dispatch = useDispatch()
  const alert = useAlert()
  const payBtn = useRef(null)

  const { shippingInfo, cartItems, billingInfo } = useSelector(
    (state) => state.cart
  )
  const { user } = useSelector((state) => state.user)
  const { error } = useSelector((state) => state.newOrder)
  const [razorPayApiKey, setRazorPayApiKey] = useState("")
  const [myPaymentInfo, setMyPaymentInfo] = useState({
    payment: false,
    orderId: "",
    paymentId: "",
    signature: "",
  })

  async function getRazorPayApiKey() {
    const { data } = await api.get("/api/v1/razorpayapikey")
    console.log("razorpay", data)
    setRazorPayApiKey(data.razorPayApiKey)
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  }

  const order = {
    shippingInfo,
    billingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
    couponPrice: orderInfo.couponPrice,
    couponCode: orderInfo.couponCode,
  }

  const submitHandler2 = async (e) => {
    e.preventDefault()

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      const { data } = await api.post(
        "/api/v1/payment/process",
        paymentData,
        config
      )

      console.log("data coming", data)

      const options = {
        key: razorPayApiKey,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Logger India",
        description: "Pay for confirm your order",
        image:
          "https://res.cloudinary.com/logger-india/image/upload/v1640610600/avatars/logo_2_qxxesv.png",
        order_id: data.order.id,
        handler: async function (response) {
          setMyPaymentInfo({
            payment: true,
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          })

          const sendRes = {
            order_id: data.order.id,
            email: user.email,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }

          const myresult = await api.post(
            "/api/v1/payment/verify",
            sendRes,
            config
          )
          const captured = myresult.data.captured
          console.log("we will redirecxt error")
          if (captured) {
            order.paymentInfo = {
              id: myresult.data.paymentId,
              status: "succeeded",
              order_id: myresult.data.order_id,
            }

            dispatch(createOrder(order))
            console.log("we will redirecxt")
            history.push("/success")
          } else {
            alert.error("There's some issue while processing payment ")
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        address: {
          line1: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          postal_code: shippingInfo.pinCode,
          country: shippingInfo.country,
        },
        theme: {
          color: "#3399cc",
        },
      }
      var rzp1 = new window.Razorpay(options)

      rzp1.open()
      rzp1.on("payment.failed", function (response) {
        payBtn.current.disabled = false
        alert.error(response.error.message)
      })
    } catch (err) {
      payBtn.current.disabled = false
      alert.error(err.response.data.message)
    }
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    getRazorPayApiKey()
  }, [dispatch, error, alert])

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler2(e)}>
          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  )
}

export default Payment
