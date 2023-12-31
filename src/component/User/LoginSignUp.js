import React, { Fragment, useRef, useState, useEffect } from "react"
import "./LoginSignUp.css"
import Loader from "../layout/Loader/Loader"
import { Link } from "react-router-dom"
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import FaceIcon from "@material-ui/icons/Face"
import { useDispatch, useSelector } from "react-redux"
import {
  clearErrors,
  login,
  register,
  googleLogin,
  facebookLogin,
} from "../../actions/userAction"
import { useAlert } from "react-alert"
import GoogleLogin from "react-google-login"
import api from "../../utils/api"

const LoginSignUp = ({ history, location }) => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { error, loading, isAuthenticated } = useSelector((state) => state.user)

  const loginTab = useRef(null)
  const registerTab = useRef(null)
  const switcherTab = useRef(null)

  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  })

  const { name, email, password } = user

  const [avatar, setAvatar] = useState("/Profile.png")
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png")
  const [googleClient, setGoogleClient] = useState("")

  const loginSubmit = (e) => {
    e.preventDefault()
    dispatch(login(loginEmail, loginPassword))
  }

  const registerSubmit = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set("name", name)
    myForm.set("email", email)
    myForm.set("password", password)
    myForm.set("avatar", avatar)
    dispatch(register(myForm))
  }

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      }

      reader.readAsDataURL(e.target.files[0])
    } else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }

  const responseSuccessGoogle = (response) => {
    console.log("response", response, "tokienfas", response.tokenId)

    const obj = {
      tokenId: response.tokenId,
    }
    dispatch(googleLogin(obj))
  }

  const responseFailureGoogle = (response) => {
    console.log(response)
    alert.error(response.error)
    dispatch(clearErrors())
  }

  async function getGoogleClientKey() {
    const { data } = await api.get("/api/v1/googleclient")
    setGoogleClient(data.googleClientSecret)
  }

  const redirect = location.search ? location.search.split("=")[1] : "/account"

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (isAuthenticated) {
      history.push(redirect)
    }
    getGoogleClientKey()
  }, [dispatch, error, alert, history, isAuthenticated, redirect])

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral")
      switcherTab.current.classList.remove("shiftToRight")

      registerTab.current.classList.remove("shiftToNeutralForm")
      loginTab.current.classList.remove("shiftToLeft")
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight")
      switcherTab.current.classList.remove("shiftToNeutral")

      registerTab.current.classList.add("shiftToNeutralForm")
      loginTab.current.classList.add("shiftToLeft")
    }
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot" className="forget-password">
                  Forget Password ?
                </Link>
                <input type="submit" value="Login" className="loginBtn" />
                <div className="orline">
                  <div className="first-child"></div>
                  <div className="or-child">or</div>
                  <div className="last-child"></div>
                </div>
                <GoogleLogin
                  className="btn btn-large btn-outline-dark google-btn"
                  clientId="645485184858-lpmdq3q6nefhpt68lj437bmt0v49vv0m.apps.googleusercontent.com"
                  buttonText="Login with Google"
                  onSuccess={responseSuccessGoogle}
                  onFailure={responseFailureGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
                <div className="orline">
                  <div className="first-child"></div>
                  <div className="or-child">or</div>
                  <div className="last-child"></div>
                </div>
                <GoogleLogin
                  className="btn btn-large btn-outline-dark google-btn"
                  clientId="645485184858-lpmdq3q6nefhpt68lj437bmt0v49vv0m.apps.googleusercontent.com"
                  buttonText="Login with Google"
                  onSuccess={responseSuccessGoogle}
                  onFailure={responseFailureGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default LoginSignUp
