// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import CreateSpotModal from "../CreateNewSpot/NewSpotModal";
import "./Navigation.css"; //added second
import menupic from "./menu-pic.png"


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
    // setIsLoaded(true)
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);

      // setIsLoaded(false)
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="ProfileButtonjs">

        <CreateSpotModal />



        <div onClick={openMenu} className="profile-button-nav">
        <img src={menupic} className="menupic"/>
        </div>

        {showMenu && (
          <div className="profile-dropdown">
            {/* <div className="your-spots-link">
            <Link to="/spots/current">Your Spots</Link>
            </div> */}
            <Link to="/spots/current">
            <div className="your-spots-link">
              Your Spots
            </div>
              </Link>

            <Link to="/reviews/current">
            <div className="your-reviews-link">
              Your Reviews
            </div>
            </Link>

            <div className="your-username">{user.username}</div>
            <div className="your-email">{user.email}</div>
            {/* <div className="logout-button"><div onClick={logout}>Log Out</div></div> */}
            <div className="logout-button" onClick={logout}>Log Out</div>
          </div>
        )}
    </div>
  );
}

export default ProfileButton;
