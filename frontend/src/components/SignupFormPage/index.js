// frontend/src/components/SignupFormPage/index.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';



function SignupFormPage() {
  const history = useHistory()
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false)


  useEffect(() => {
    let errors = []
    if (firstName.length < 2 || firstName.length > 30) errors.push("Provide First name between 2-30 characters")
    if (lastName.length < 2 || lastName.length > 30) errors.push("Provide Last name between 2-30 characters")
    if (email.length < 3) errors.push("Provide email greater than 3 characters long")
    if (!email.includes("@") || !email.includes(".")) errors.push("Please enter a valid email")
    if (username.length < 3 || username.length > 30) errors.push("Enter a username between 3-30 characters")
    if (password.length < 1) errors.push("Please enter a password")
    if (password !== confirmPassword) errors.push("Please confirm your password")
    setErrors(errors)
  },[firstName, lastName, email, username, password, confirmPassword])
  
  if (sessionUser) return <Redirect to="/" />;


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      setIsSubmitted(true)
      return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          console.log("handle submit errors", data.errors)
          if (data && data.errors) setErrors(errors);
        });
    }
    // history.push("/")
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit} className="spot-form">
      <h2 className="title">Join BenBnB!</h2>
      <ul className="errors">
        {isSubmitted && errors.map((error, idx) => <li className="error-message" key={idx}>{error}</li>)}
      </ul>
      <label className="form-stuff">
        {/* First Name */}
        <input className="form-input"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          // required
        />
      </label>
      <label className="form-stuff">
        {/* Last Name */}
        <input className="form-input"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          // required
        />
      </label>
      <label className="form-stuff">
        {/* Email */}
        <input className="form-input"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // required
        />
      </label>
      <label className="form-stuff">
        {/* Username */}
        <input className="form-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          // required
        />
      </label>
      <label className="form-stuff">
        {/* Password */}
        <input className="form-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // required
        />
      </label>
      <label className="form-stuff">
        {/* Confirm Password */}
        <input className="form-input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          // required
        />
      </label>
      <div className="buttons">
      <button type="submit" className="login-buttons">Sign Up</button>
      </div>

    </form>
  );
}

export default SignupFormPage;