// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormPage/Modal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        {/* <NavLink to="/signup">Sign Up</NavLink> */}
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className='NavBar'>

      <div className='navlink'>
        <NavLink exact to="/">
           <i class="fa-solid fa-dragon fa-2xl"></i>
           <div className='benbnb-logo'>BenBnB</div>
        </NavLink>
      </div>
      <div className='welcome'><h1>Welcome to BenBnB</h1></div>
        <div className='aaa'>
            {isLoaded && sessionLinks}
        </div>


    </div>
  );
}

export default Navigation;