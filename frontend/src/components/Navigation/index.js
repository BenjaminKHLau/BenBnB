// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormPage/Modal';
import './Navigation.css';
import logo from "./BenBnBLogo.png"
function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className="login-signup-container">
      <div className="login-signup">
        <LoginFormModal />
      </div>

      <div className="login-signup">
        <SignupFormModal />
      </div>

      </div>
    );
  }

  return (
    <div className='NavBar'>

      <div className='navlink'>
        <NavLink exact to="/">
            <img src={logo} className="BenBnB-pic"/>
           {/* <div className='benbnb-logo'>BenBnB</div> */}
        </NavLink>
      </div>
      <div className='welcome'><h1>Welcome to BenBnB</h1></div>
        {/* <div className='aaa'> */}
            {isLoaded && sessionLinks}
        {/* </div> */}


    </div>
  );
}

export default Navigation;