import axios from "axios"
import store from "../store"

const api = axios.create({
  baseURL: "https://logger-india.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
})
/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
**/

export default api
