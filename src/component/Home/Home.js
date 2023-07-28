import React, { Fragment, useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import BackgroundImg1 from "../../images/homecover.png";
import OfferDetails from "../layout/Offers/OfferDetails";
import HomeCarousel from "../layout/Carousel/HomeCarousel";
import Sustainability from "../layout/Sustainability/Sustainability";
import DownloadApp from "../layout/DownloadOurApp/DownloadApp";
import AllProduct from "../layout/AllProduct/AllProduct";
import Footer from "../layout/Footer/Footer";
import VirtualTour from "../layout/VirtualTour/VirtualTour";
import OurBrands from "../layout/OurBrands/OurBrands";
import Faqs from "../layout/Faqs/Faqs";
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Logger India" />
          <HomeCarousel />
          <AllProduct />
          <DownloadApp />
          <Sustainability />
          <h1 className="homeHeading">Featured Products</h1>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <VirtualTour />
          <Faqs />
          <OfferDetails />
          <OurBrands />
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
