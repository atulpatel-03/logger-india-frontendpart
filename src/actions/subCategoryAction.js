import {
  GET_ALL_SUBCATEGORY,
  SUBCATEGORY_REQUEST,
  REMOVE_SUBCATEGORY,
  SUBCATEGORY_FAIL,
  SUBCATEGORY_GENERATE_SUCCESS,
  SUBCATEGORY_GENERATE_FAIL,
} from "../constants/subCategoryConstant"
import axios from "axios"
import api from "../utils/api"

// Create Coupon
export const generateSubCategory = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: SUBCATEGORY_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await api.post(
      `/api/v1/admin/createsubcategory/${id}`,
      formData,
      config
    )

    dispatch({ type: SUBCATEGORY_GENERATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_GENERATE_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const getAllSubCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: SUBCATEGORY_REQUEST })

    console.log("subcategory id", id)
    const { data } = await api.get(`/api/v1/getallsubcategory/${id}`)

    dispatch({ type: GET_ALL_SUBCATEGORY, payload: data.allSubCategory })
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const deleteSubCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: SUBCATEGORY_REQUEST })

    const { data } = await api.delete(`/api/v1/admin/deletesubcategory/${id}`)

    dispatch({
      type: REMOVE_SUBCATEGORY,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_FAIL,
      payload: error.response.data.message,
    })
  }
}
