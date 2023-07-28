import {
  GET_ALL_BRAND,
  BRAND_REQUEST,
  REMOVE_BRAND,
  BRAND_FAIL,
  BRAND_GENERATE_SUCCESS,
  BRAND_GENERATE_FAIL,
} from "../constants/brandConstant"
import axios from "axios"
import api from "../utils/api"

// Create Coupon
export const generateBrand = (formData) => async (dispatch) => {
  try {
    dispatch({ type: BRAND_REQUEST })
    console.log("formda", formData)
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await api.post(
      "/api/v1/admin/createbrand",
      formData,
      config
    )

    dispatch({ type: BRAND_GENERATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: BRAND_GENERATE_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const getAllBrand = () => async (dispatch) => {
  try {
    dispatch({ type: BRAND_REQUEST })

    const { data } = await api.get("/api/v1/getallbrand")

    dispatch({ type: GET_ALL_BRAND, payload: data.allBrand })
  } catch (error) {
    dispatch({
      type: BRAND_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const deleteBrand = (id) => async (dispatch) => {
  try {
    dispatch({ type: BRAND_REQUEST })

    const { data } = await api.delete(`/api/v1/admin/deletebrand/${id}`)

    dispatch({
      type: REMOVE_BRAND,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: BRAND_FAIL,
      payload: error.response.data.message,
    })
  }
}
