import {
    GET_ALL_BRAND,
    BRAND_GENERATE_SUCCESS,
    BRAND_GENERATE_FAIL,
    BRAND_REQUEST,
    REMOVE_BRAND,
    BRAND_FAIL
  } from "../constants/brandConstant";

  export const brandReducer = (
      state = { allBrand:[]},
      action
  ) =>{
        switch(action.type){
            case BRAND_REQUEST:
                return {
                    loading: true,
                    allBrand: [],
                  };
            case GET_ALL_BRAND:
                return{
                    ...state,
                    loading:false,
                    allBrand:action.payload
                }
            case BRAND_GENERATE_SUCCESS:
                return{
                    ...state,
                    loading:false,
                }
            case REMOVE_BRAND:
                return {
                    ...state,
                    loading:false,
                };

            case BRAND_GENERATE_FAIL:
                return {
                    ...state,
                    loading:false,
                    error: action.payload,
                }
            case BRAND_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }
            default:
                return state;
    }
  }