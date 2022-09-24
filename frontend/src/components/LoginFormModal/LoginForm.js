// frontend/src/components/LoginFormPage/index.js
import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
// import {useHistory} from 'react-router-dom'
function LoginFormPage() {
  const history = useHistory()
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false)


  if (sessionUser) <Redirect to="/" />

  useEffect(() => {
    let errors = []
    if (credential.length < 1) errors.push("Enter your Username or Email")
    if (password.length < 1) errors.push("Enter your password")
    setErrors(errors)
  },[credential, password])

  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors([]);
    setIsSubmitted(true)
    if (errors.length > 0) {
      return
    }
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const demoLogin = (e) => {
    e.preventDefault()
    return dispatch(sessionActions.login({ credential: "demo@user.io", password: "password" }))
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className='login-container'>

      <h2 className='title'>Welcome Back!</h2>
      <ul>
        {isSubmitted && errors.map((error, idx) => <div className='errors' key={idx}>{error}</div>)}
      </ul>
      <div className='credentials'>
      <div className='form-box'>

      <label className='form-stuff'>
        {/* Username or Email */}
        <input className='form-input'
          type="text"
          placeholder="Username or Email"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          // required
          />
      </label>
      <label className='form-stuff'>
        {/* Password */}
        <input className='form-input'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // required
          />
      </label>
          </div>
          </div>
          <div className='buttons'>
      <button type="submit" className="login-buttons" disabled={isSubmitted && errors.length > 0}>Log In</button>
      <button onClick={demoLogin} className="login-buttons">Demo User</button>
          </div>

          </div>
    </form>
  );
}

export default LoginFormPage;