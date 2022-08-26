// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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
      {/* <div className="create-spot-modal"> */}
        <CreateSpotModal />
      {/* </div> */}

      {/* <div className="NavBar2"> */}
        <div onClick={openMenu} className="profile-button-nav">
        <img src={menupic} className="menupic">
          {/* <div className="fas fa-user-circle" /> */}
        </img>
        </div>

        {showMenu && (
          <div className="profile-dropdown">
            <div className="your-spots-link">
            <Link to="/spots/current">Your Spots</Link>
            </div>
            <div className="your-reviews-link">
            <Link to="/reviews/current">Your Reviews</Link>
            </div>

            <div>{user.username}</div>
            <div>{user.email}</div>
            <div><button onClick={logout}>Log Out</button></div>
          </div>
        )}
      {/* </div> */}
    </div>
  );
}

export default ProfileButton;
