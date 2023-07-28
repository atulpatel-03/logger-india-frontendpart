import "./App.css"
import { useEffect, useState } from "react"
import Header from "./component/layout/Header/Header.js"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import WebFont from "webfontloader"
import React from "react"
import Footer from "./component/layout/Footer/Footer"
import Home from "./component/Home/Home"
import ProductDetails from "./component/Product/ProductDetails"
import Products from "./component/Product/Products"
import Search from "./component/Product/Search"
import LoginSignUp from "./component/User/LoginSignUp"
import store from "./store"
import { loadUser } from "./actions/userAction"
import UserOptions from "./component/layout/Header/UserOptions"
import { useSelector } from "react-redux"
import Profile from "./component/User/Profile"
import ProtectedRoute from "./component/Route/ProtectedRoute"
import UpdateProfile from "./component/User/UpdateProfile"
import UpdatePassword from "./component/User/UpdatePassword"
import ForgotPassword from "./component/User/ForgotPassword"
import ResetPassword from "./component/User/ResetPassword"
import Cart from "./component/Cart/Cart"
import Shipping from "./component/Cart/Shipping"
import ConfirmOrder from "./component/Cart/ConfirmOrder"
import axios from "axios"
import Payment from "./component/Cart/Payment"

import OrderSuccess from "./component/Cart/OrderSuccess"
import MyOrders from "./component/Order/MyOrders"
import OrderDetails from "./component/Order/OrderDetails"
import Dashboard from "./component/Admin/Dashboard.js"
import ProductList from "./component/Admin/ProductList.js"
import NewProduct from "./component/Admin/NewProduct"
import UpdateProduct from "./component/Admin/UpdateProduct"
import OrderList from "./component/Admin/OrderList"
import ProcessOrder from "./component/Admin/ProcessOrder"
import UsersList from "./component/Admin/UsersList"
import UpdateUser from "./component/Admin/UpdateUser"
import ProductReviews from "./component/Admin/ProductReviews"
import Contact from "./component/layout/Contact/Contact"
import About from "./component/layout/About/About"
import NotFound from "./component/layout/Not Found/NotFound"
import Navbar from "./component/layout/Header/Navbar/Navbar"
import SanitaryProducts from "./component/Product/SanitaryProducts"
import FaucetProducts from "./component/Product/FaucetProducts"
import WellnessProducts from "./component/Product/WellnessProducts"
import MirrorProducts from "./component/Product/MirrorProducts"
import TileProducts from "./component/Product/TileProducts"
import KitchenProducts from "./component/Product/KitchenProducts"
import PrivacyPolicy from "./component/layout/Policies/PrivacyPolicy"
import ReturnRefund from "./component/layout/Policies/ReturnRefund"
import TermsCondition from "./component/layout/Policies/TermsCondition"
import GenerateCoupon from "./component/Admin/GenerateCoupon"
import FaqsQuestions from "./component/layout/Faqs/FaqsQuestions"
import SubCategory from "./component/Admin/SubCategory"
import Brand from "./component/Admin/Brand"
import Category from "./component/Admin/Category"
import api from "./utils/api"

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const [razorPayApiKey, setRazorPayApiKey] = useState("")

  async function getRazorPayApiKey() {
    const { data } = await api.get("/api/v1/razorpayapikey")
    console.log("razorpay", data)
    setRazorPayApiKey(data.razorPayApiKey)
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    })

    store.dispatch(loadUser())
    getRazorPayApiKey()
  }, [])

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Navbar />
      {/* {isAuthenticated && <Header /> } */}
      <a class="whats-app" href="https://wa.me/+919529958624" target="_blank">
        <i class="fa fa-whatsapp my-float"></i>
      </a>
      {isAuthenticated && <UserOptions user={user} />}

      <ProtectedRoute exact path="/process/payment" component={Payment} />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route
          exact
          path="/sanitaryware-products"
          component={SanitaryProducts}
        />
        <Route exact path="/faucets-products" component={FaucetProducts} />
        <Route exact path="/wellness-products" component={WellnessProducts} />
        <Route exact path="/mirror-products" component={MirrorProducts} />
        <Route exact path="/tiles-products" component={TileProducts} />
        <Route exact path="/kitchen-products" component={KitchenProducts} />
        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        <Route exact path="/return-policy" component={ReturnRefund} />
        <Route exact path="/terms-condition" component={TermsCondition} />

        <Route path="/products/:keyword" component={Products} />

        <Route exact path="/search" component={Search} />

        <Route exact path="/contact" component={Contact} />

        <Route exact path="/about" component={About} />

        <Route exact path="/faqs" component={FaqsQuestions} />

        <ProtectedRoute exact path="/account" component={Profile} />

        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />

        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />

        <Route exact path="/login" component={LoginSignUp} />

        <Route exact path="/cart" component={Cart} />

        <ProtectedRoute exact path="/shipping" component={Shipping} />

        <ProtectedRoute exact path="/success" component={OrderSuccess} />

        <ProtectedRoute exact path="/orders" component={MyOrders} />

        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />

        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          exact
          path="/admin/products"
          isAdmin={true}
          component={ProductList}
        />
        <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
        />

        <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />
        <ProtectedRoute
          exact
          path="/admin/orders"
          isAdmin={true}
          component={OrderList}
        />

        <ProtectedRoute
          exact
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
        />
        <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />

        <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />

        <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
        />

        <ProtectedRoute
          exact
          path="/admin/generatecoupon"
          isAdmin={true}
          component={GenerateCoupon}
        />

        <ProtectedRoute
          exact
          path="/admin/createsubcategory"
          isAdmin={true}
          component={SubCategory}
        />

        <ProtectedRoute
          exact
          path="/admin/addbrand"
          isAdmin={true}
          component={Brand}
        />

        <ProtectedRoute
          exact
          path="/admin/createcategory"
          isAdmin={true}
          component={Category}
        />

        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Switch>
    </Router>
  )
}

export default App
