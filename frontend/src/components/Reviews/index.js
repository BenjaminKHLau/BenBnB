import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { deleteReviewThunk, getSpotReviewsThunk } from "../../store/reviews";
import { getSpotByIdThunk } from "../../store/spots";
import ReviewCard from "./ReviewCard";
import ReviewFormModal from "./ReviewModal";
import yellowstar from "../AllSpots/yellowstar.png"
// import { getAllSpotsThunk } from "../../store/spots";

function GetAllReviewsComponent() {
  // console.log("use params",useParams())
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const allReviews = useSelector((state) => state.reviews);
  const normalReviews = Object.values(allReviews);

  // const session = useSelector(state => state.session)
  // let currentUser = session.user

  const allSpots = useSelector((state) => state.spots);
  const theSpot = allSpots[spotId];

  const session = useSelector((state) => state.session);
  let currentUser = session.user;

  // let currentUser = session.user;
  let user;
  if (currentUser) {
    user = currentUser.id;
  }
  let isOwner = false;
  if (theSpot?.ownerId && currentUser) {
    isOwner = theSpot?.ownerId === user;
  }

  const spot = useSelector((state) => state);
  // console.log("reviews spot",theSpot)

  useEffect(() => {
    dispatch(getSpotReviewsThunk(spotId));
  }, [dispatch]);

  const deleteReviewButton = async (reviewId) => {
    await dispatch(deleteReviewThunk(reviewId));
    await dispatch(getSpotByIdThunk(spotId));
  };

  return (
    <>
      <div className="review-container">
        <div className="rating-container">
        <div className="reviews-rating"><img src={yellowstar} className="star-rating-home-img"></img>{theSpot?.avgStarRating} </div>
        <div className="spacers"> · </div>
        <div className="reviews-title">{theSpot?.numReviews} Reviews</div>
        </div>

        {!isOwner && (
          <div className="review-modal">
            <ReviewFormModal />
          </div>
        )}

      </div>
        <div className="review-middle-container">
          {normalReviews.map((review) => (
            <ReviewCard review={review} />
          ))}
        </div>
    </>
  );
}

export default GetAllReviewsComponent;
