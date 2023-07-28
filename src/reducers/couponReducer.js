import {
    GET_ALL_COUPON,
    COUPON_GENERATE_SUCCESS,
    COUPON_GENERATE_FAIL,
    COUPON_REQUEST,
    REMOVE_COUPON,
    COUPON_FAIL
  } from "../constants/couponConstant";

  export const couponReducer = (
      state = { allCoupon:[]},
      action
  ) =>{
        switch(action.type){
            case COUPON_REQUEST:
                return {
                    loading: true,
                    allCoupon: [],
                    singleCoupon:{}
                  };
            case GET_ALL_COUPON:
                return{
                    ...state,
                    loading:false,
                    allCoupon:action.payload
                }
            case COUPON_GENERATE_SUCCESS:
                return{
                    ...state,
                    loading:false,
                }
            case REMOVE_COUPON:
                return {
                    ...state,
                    loading:false,
                };

            case COUPON_GENERATE_FAIL:
                return {
                    ...state,
                    loading:false,
                    error: action.payload,
                }
            case COUPON_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }
            default:
                return state;
    }
  }