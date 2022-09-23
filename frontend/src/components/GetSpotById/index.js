import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { getSpotReviewsThunk } from "../../store/reviews";
// import { getAllSpotsThunk } from "../../store/spots";
import { getSpotByIdThunk, deleteSpotThunk } from "../../store/spots";
import EditSpotFormComponent from "../EditSpot";
import EditFormModal from "../EditSpot/ModalEditSpot";
import GetAllReviewsComponent from "../Reviews";
import ReviewFormModal from "../Reviews/ReviewModal";
import "./spotId.css";
import yellowstar from "../AllSpots/yellowstar.png";
import sorrykiwi from "../SPOTCARD/sorrykiwi.jpg"
import sorrykiwi2 from "./sorrykiwi2.png"

function GetSpotByIdComponent() {
  const history = useHistory();
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const allSpots = useSelector((state) => state.spots);
  const theSpot = allSpots[spotId];
  const reviews = useSelector((state) => Object.values(state.reviews));
  const session = useSelector((state) => state.session);

  let currentUser = session.user;
  let user;
  if (currentUser) {
    user = currentUser.id;
  }
  let isOwner = false;
  if (theSpot?.ownerId && currentUser) {
    isOwner = theSpot?.ownerId === user;
  }

  // console.log("OWNER?", isOwner);

  useEffect(() => {
    dispatch(getSpotByIdThunk(spotId));
    dispatch(getSpotReviewsThunk(spotId));
  }, [dispatch]);

  const deleteButton = async (e) => {
    e.preventDefault();
    await dispatch(deleteSpotThunk(spotId));

    history.push("/");
  };

  let spot = theSpot;
  return (
    <div className="big-spot-container">
      <div className="name-edit-delete-container">
        <div className="spotid-name">{spot?.name}</div>
      </div>

      <div className="infobar">
        <div className="star-rating-home">
          <img src={yellowstar} className="star-rating-home-img"></img>
          {spot?.avgStarRating}
          <div className="spacers"> · </div>
          <div className="num-reviews">{spot?.numReviews} reviews</div>
          <div className="spacers"> · </div>

          <div className="location-info">
            <div>{spot?.city}</div>
            <div>, {spot?.state}</div>
            <div>, {spot?.country}</div>
            {/* <div className="spacers"> · </div> */}
          </div>
        </div>
        <div>
          {isOwner && (
            <div className="owner-option-buttons">
              <EditFormModal spotId={spotId} />
              <div className="edit-delete" onClick={(e) => deleteButton(e)}>
                Delete
              </div>
            </div>
          )}
        </div>
      </div>

      {spot?.Images && (
        <img
          className="previewImage"
          src={
            spot?.Images[0]?.url ||
            sorrykiwi
          }
          alt="if your image link doesn't work, please wait for default to load"
          onError={e => {
            e.target.src=sorrykiwi2
            // e.onError=null
          }}
        ></img>
      )}
      <div className="info-container">
        <div className="spot-host-description">
          <div className="spot-host">Hosted By: {spot?.Owner?.firstName}</div>
          <div className="spot-description">Description: {spot?.description}</div>
        </div>
        <div className="reserve-spot-price">
          <div className="reserve-bar">
          <div className="price">${spot?.price} night</div>  
          {/* <div className="spacers"> · </div> */}
          <div className="box-nav">

          <div className="reviews-rating"><img src={yellowstar} className="star-rating-home-img"></img>{spot?.avgStarRating} </div>
          <div className="spacers"> · </div>
          <div className="num-reviews">{spot?.numReviews} reviews</div>
          </div>
          </div>
          <div className="booking-options">Available Soon!</div>
          <div className="RESERVEDSTUFF">Check-in / Check-out Placeholder</div>
          <div className="RESERVEDSTUFF">Reserve Booking Placeholder</div>
          <div className="RESERVEDSTUFF">Cleaning Fee: $100</div>
          <div className="RESERVEDSTUFF">Service Fee: $50</div>
          <div className="RESERVEDSTUFF">Tax: 10%</div>
          <div className="RESERVEDSTUFFTOTAL">Total: ${((spot?.price * 1.1)+ 50 + 100).toFixed(2)}</div>

        </div>  
      </div>
      <div className="spot-reviews-container">
      {/* {!isOwner && (
        <div className="review-modal">
          <ReviewFormModal />
        </div>
      )} */}
        <GetAllReviewsComponent reviews={reviews} />
      </div>
          <div className="location">Where you'll be: {spot?.address}</div>
    </div>
  );
}

export default GetSpotByIdComponent;
