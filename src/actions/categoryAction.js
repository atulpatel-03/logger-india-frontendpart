import {
  GET_ALL_CATEGORY,
  CATEGORY_REQUEST,
  REMOVE_CATEGORY,
  CATEGORY_FAIL,
  CATEGORY_GENERATE_SUCCESS,
  CATEGORY_GENERATE_FAIL,
} from "../constants/categoryConstant"
import axios from "axios"
import api from "../utils/api"

// Create Coupon
export const generateCategory = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await api.post(
      "/api/v1/admin/createcategory",
      formData,
      config
    )

    dispatch({ type: CATEGORY_GENERATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CATEGORY_GENERATE_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const getAllCategory = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_REQUEST })

    const { data } = await api.get("/api/v1/getallcategory")

    dispatch({ type: GET_ALL_CATEGORY, payload: data.allCategory })
  } catch (error) {
    dispatch({
      type: CATEGORY_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_REQUEST })

    const { data } = await api.delete(`/api/v1/admin/deletecategory/${id}`)

    dispatch({
      type: REMOVE_CATEGORY,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_FAIL,
      payload: error.response.data.message,
    })
  }
}
