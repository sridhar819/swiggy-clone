import { useNavigate, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import biglogin from '../../assets/biglogin.png'
import mobile from '../../assets/mobile.png'
import weblogo from '../../assets/weblogo.png'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import './index.css'
import { useEffect, useRef, useState } from 'react';
const Login = () => {

  const [password, setPass] = useState("")
  const [username, setUsername] = useState('')
  const [showPass, togglePass] = useState(false)
  const [errormsg, toggleErr] = useState({ isErr: false, errMsg: "" })
  const navigate = useNavigate()

  const submitForm = async (e) => {
    e.preventDefault()
    const url = "https://apis.ccbp.in/login"
    const options = {
      method: "POST",
      body: JSON.stringify({ username, password })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      Cookies.set("jwt_token", data.jwt_token, { expires: 60 })
      navigate('/')
    }
  }

  const token = Cookies.get("jwt_token")
  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className='login-container'>

      <div className="form-card">
        <form onSubmit={submitForm} className="form">
          <img alt="website logo" src={weblogo} />
          <h3>Tasty Kitchen</h3>
          <label htmlFor="username">USERNAME</label>
          <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" id="username" />
          <label htmlFor="password">PASSWORD</label>
          <div className="password-card">
            <input onChange={(e) => setPass(e.target.value)} value={password} className='password-card-input' type={showPass ? "text" : "password"} id="password" />
            {password.length > 0 && <button type="button" onClick={() => { togglePass(pre => !pre) }}>
              {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>}
          </div>

          <button className='btn btn-warning mt-3 text-light' type="submit">Login</button>
          <button className='btn btn-primary mt-2' type='submit'>SignUp for free</button>
          {errormsg.isErr && <p className='text-danger'>*{errormsg.errMsg}</p>}
        </form>
      </div>
      <div className="login-image-card">
        <img className='larger-device' src={biglogin} />
      </div>
      <img src={mobile} alt="website logo" className='mobile-img' />
    </div>
  )
}

export default Login