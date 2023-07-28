import {
  GET_ALL_COUPON,
  COUPON_REQUEST,
  REMOVE_COUPON,
  COUPON_FAIL,
  COUPON_GENERATE_SUCCESS,
  COUPON_GENERATE_FAIL,
} from "../constants/couponConstant"
import axios from "axios"
import api from "../utils/api"

// Create Coupon
export const generateCoupon = (formData) => async (dispatch) => {
  try {
    dispatch({ type: COUPON_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await api.post(
      "/api/v1/admin/generatecoupon",
      formData,
      config
    )

    dispatch({ type: COUPON_GENERATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: COUPON_GENERATE_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const getAllCoupon = () => async (dispatch) => {
  try {
    dispatch({ type: COUPON_REQUEST })

    const { data } = await api.get("/api/v1/getallcoupons")

    dispatch({ type: GET_ALL_COUPON, payload: data.allCoupon })
  } catch (error) {
    dispatch({
      type: COUPON_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const deleteCoupon = (id) => async (dispatch) => {
  try {
    dispatch({ type: COUPON_REQUEST })

    const { data } = await api.delete(`/api/v1/admin/deletecoupon/${id}`)

    dispatch({
      type: REMOVE_COUPON,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: COUPON_FAIL,
      payload: error.response.data.message,
    })
  }
}
