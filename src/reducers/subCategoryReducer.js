import {
    GET_ALL_SUBCATEGORY,
    SUBCATEGORY_GENERATE_SUCCESS,
    SUBCATEGORY_GENERATE_FAIL,
    SUBCATEGORY_REQUEST,
    REMOVE_SUBCATEGORY,
    SUBCATEGORY_FAIL
  } from "../constants/subCategoryConstant";

  export const subCategoryReducer = (
      state = { allSubCategory:[]},
      action
  ) =>{
        switch(action.type){
            case SUBCATEGORY_REQUEST:
                return {
                    loading: true,
                    allSubCategory: [],
                  };
            case GET_ALL_SUBCATEGORY:
                return{
                    ...state,
                    loading:false,
                    allSubCategory:action.payload
                }
            case SUBCATEGORY_GENERATE_SUCCESS:
                return{
                    ...state,
                    loading:false,
                }
            case REMOVE_SUBCATEGORY:
                return {
                    ...state,
                    loading:false,
                };

            case SUBCATEGORY_GENERATE_FAIL:
                return {
                    ...state,
                    loading:false,
                    error: action.payload,
                }
            case SUBCATEGORY_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }
            default:
                return state;
    }
  }