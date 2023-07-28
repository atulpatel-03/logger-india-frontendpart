import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "../Cart/CheckoutSteps";
import BusinessIcon from '@material-ui/icons/Business';
import ReceiptIcon from '@material-ui/icons/Receipt';
import DescriptionIcon from '@material-ui/icons/Description';


const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo, billingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo? shippingInfo.address:'');
  const [city, setCity] = useState(shippingInfo ? shippingInfo.city:'');
  const [state, setState] = useState(shippingInfo ? shippingInfo.state:'');
  const [country, setCountry] = useState(shippingInfo ? shippingInfo.country:'');
  const [pinCode, setPinCode] = useState(shippingInfo ? shippingInfo.pinCode:'');
  const [phoneNo, setPhoneNo] = useState(shippingInfo ? shippingInfo.phoneNo:'');

  const [billingData, setBillingData] = useState({
    companyNameB:(billingInfo? billingInfo.company : ''),
    addressB:(billingInfo ? billingInfo.address : ''),
    cityB:(billingInfo ? billingInfo.city : ''),
    stateB:(billingInfo ? billingInfo.state : ''),
    countryB:(billingInfo ? billingInfo.country : ''),
    pinCodeB:(billingInfo ? billingInfo.pinCode : ''),
    phoneNoB:(billingInfo ? billingInfo.phoneNo : ''),
    GSTIN:(billingInfo ? billingInfo.GSTIN : ''),
    additionalInfoB:(billingInfo ? billingInfo.additionalInfo : ''),
  })

  const { 
    companyNameB,
    addressB,
    cityB,
    stateB,
    countryB,
    pinCodeB,
    phoneNoB,
    GSTIN,
    additionalInfoB
  } = billingData;

  const onChange = (e) =>{
    setBillingData({
      ...billingData,
      [e.target.name]:e.target.value
    })
  } 

  const onCheckbox = () =>{
    setBillingData({
      ...billingData,
      addressB:address,
      cityB:city,
      stateB: state,
      countryB: country,
      pinCodeB:pinCode,
      phoneNoB:phoneNo
    })
  }
  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
   
    const data = {
        shippingInfo:{
          address, city, state, country, pinCode, phoneNo
        },
        billingInfo:{
          address: addressB, 
          city:cityB, 
          state: stateB, 
          country: countryB, 
          pinCode : pinCodeB, 
          phoneNo : phoneNoB, 
          company : companyNameB, 
          GSTIN : GSTIN,
          additionalInfo: additionalInfoB,
        }
    }
    dispatch(saveShippingInfo(data));
    history.push("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title="Shipping Details" />

      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
      <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <PublicIcon />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <h2 className="shippingHeading">Billing Details</h2>

           <div className="checkbox-div">
           <input type="checkbox"
              className="checkbox-input"
              name="billingCheckbox"
              value="clicking"
              onClick = { onCheckbox }  
            />
            <label className="checkbox-class">Billing Address is Same as Shipping Address</label>
           </div>

           <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={addressB}
                name="addressB"
                onChange={onChange}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                name="cityB"
                required
                value={cityB}
                onChange={onChange}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                name="pinCodeB"
                required
                value={pinCodeB}
                onChange={onChange}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                name="phoneNoB"
                required
                value={phoneNoB}
                onChange={onChange}
                size="10"
              />
            </div>

            <div>
              <PublicIcon />

              <select
                required
                name="countryB"
                value={countryB}
                onChange={onChange}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {countryB && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={stateB}
                  name="stateB"
                  onChange={onChange}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <div>
              <BusinessIcon />
              <input
                type="text"
                placeholder="Company Name (Optional)"
                name="companyNameB"
                value={companyNameB}
                onChange={onChange}
              />
            </div>

            <div>
              <ReceiptIcon />
              <input
                type="text"
                placeholder="GST Number (Optional)"
                value={GSTIN}
                onChange={onChange}
                name="GSTIN"
              />
            </div>

            <div>
              <DescriptionIcon />
              <input
                type="text"
                placeholder="Additional Info (Optional)"
                value={additionalInfoB}
                onChange={onChange}
                name="additionalInfoB"
              />
            </div>

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
