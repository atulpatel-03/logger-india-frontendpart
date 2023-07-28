import {
    GET_ALL_CATEGORY,
    CATEGORY_GENERATE_SUCCESS,
    CATEGORY_GENERATE_FAIL,
    CATEGORY_REQUEST,
    REMOVE_CATEGORY,
    CATEGORY_FAIL
  } from "../constants/categoryConstant";

  export const categoryReducer = (
      state = { allCategory:[]},
      action
  ) =>{
        switch(action.type){
            case CATEGORY_REQUEST:
                return {
                    loading: true,
                    allCategory: [],
                  };
            case GET_ALL_CATEGORY:
                return{
                    ...state,
                    loading:false,
                    allCategory:action.payload
                }
            case CATEGORY_GENERATE_SUCCESS:
                return{
                    ...state,
                    loading:false,
                }
            case REMOVE_CATEGORY:
                return {
                    ...state,
                    loading:false,
                };

            case CATEGORY_GENERATE_FAIL:
                return {
                    ...state,
                    loading:false,
                    error: action.payload,
                }
            case CATEGORY_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }
            default:
                return state;
    }
  }