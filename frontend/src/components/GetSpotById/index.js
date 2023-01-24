import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { getSpotReviewsThunk } from "../../store/reviews";
// import { getAllSpotsThunk } from "../../store/spots";
import { getSpotByIdThunk, deleteSpotThunk } from "../../store/spots";
import CreateBookingModal from "../Bookings/CreateBookingModal";
import EditSpotFormComponent from "../EditSpot";
import EditFormModal from "../EditSpot/ModalEditSpot";
import GetAllReviewsComponent from "../Reviews";
import ReviewFormModal from "../Reviews/ReviewModal";
import "./spotId.css";
import yellowstar from "../AllSpots/yellowstar.png";
import sorrykiwi from "../SPOTCARD/sorrykiwi.jpg"
import sorrykiwi2 from "./sorrykiwi2.png"
import benbnbword from './benbnbword.png'
import guarantee from './guarantee.png'
import calendaricon from './calendar-icon.png'
import cooking from './cooking.png'
import wifi from './wifi.png'
import parking from './parking.png'
import pool from './pool.png'
import pets from './pets.png'
import AC from './AC.png'
import washer from './washer.png'
import dryer from './dryer.png'
import tv from './tv.png'
import CreateBookingFormComponent from "../Bookings/CreateBooking";
import SpotBookings from "../Bookings/SpotBookings";
import { getAllBookingsThunk } from "../../store/bookings";

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
    dispatch(getAllBookingsThunk(spotId));
  }, [dispatch]);

  const deleteButton = async (e) => {
    e.preventDefault();
    await dispatch(deleteSpotThunk(spotId));

    history.push("/");
  };
  let spot = theSpot;

  let cleaningFee;
  let serviceFee;
  if ((spot?.price * .15) > 100) {
    cleaningFee = (spot?.price * .15)
  } else {
    cleaningFee = 100;
  }

  if ((spot?.price * .085) > 75) {
    serviceFee = (spot?.price * .085)
  } else {
    serviceFee = 75;
  }

  // console.log(cleaningFee)
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
            spot?.Images[0]?.url
             ||
            sorrykiwi2
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
          <div className="host-description">
            <div className="spot-host">Hosted By: {spot?.Owner?.firstName}</div>
            <div className="spot-description">Description: {spot?.description}</div>
          </div>
          <div className="cancellations"><img src={calendaricon} className="calendar"/> Free cancellation for 48 hours</div>

          <div className="spot-random-info">
            <div className="bnbtee">
              <img src={benbnbword} className="benbnbword"/> 
              <img src={guarantee} className="benbnbword"/> 
            </div>
            <div className="protections">Every booking is protected by BenBnB Guarantee. You will be protected from Host cancellation fees, inaccurate listings, and other issues like checking in!</div>
          </div>

          <div className="amenities">
            <div className="offers">What this place offers</div>
            <div className="offers-container">
              <div className="offer-stuff"><img src={cooking} className="offer-image"/> Kitchen</div>
              <div className="offer-stuff"><img src={wifi} className="offer-image"/> Wifi</div>
              <div className="offer-stuff"><img src={parking} className="offer-image"/> Free Parking on Premises</div>
              <div className="offer-stuff"><img src={pool} className="offer-image"/> Pool</div>
              <div className="offer-stuff"><img src={pets} className="offer-image"/> Pets Allowed</div>
              <div className="offer-stuff"><img src={tv} className="offer-image"/> Apple TV</div>
              <div className="offer-stuff"><img src={AC} className="offer-image"/> Central Air Conditioning</div>
              <div className="offer-stuff"><img src={AC} className="offer-image"/> Central Heating</div>
              <div className="offer-stuff"><img src={washer} className="offer-image"/> Washer</div>
              <div className="offer-stuff"><img src={dryer} className="offer-image"/> Dryer</div>
            </div>
          </div>

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
          {/* <div className="booking-options">Available Soon!</div> */}
          {/* <CreateBookingModal /> */}
          <CreateBookingFormComponent />
        {<SpotBookings spotId={spotId}/>}
          {/* <div className="RESERVEDSTUFF">Check-in / Check-out Placeholder</div> */}
          {/* <div className="RESERVEDSTUFF">Reserve Booking Placeholder</div> */}
          <div className="RESERVEDSTUFF">Cleaning Fee: ${cleaningFee.toFixed(2)}</div>
          <div className="RESERVEDSTUFF">Service Fee: ${serviceFee.toFixed(2)}</div>
          <div className="RESERVEDSTUFF">Tax: 10%</div>
          <div className="RESERVEDSTUFFTOTAL">Total: ${((spot?.price * 1.1) + cleaningFee + serviceFee).toFixed(2)}</div>

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
          <div className="SpotBookings">
            
          </div>
    </div>
  );
}

export default GetSpotByIdComponent;
