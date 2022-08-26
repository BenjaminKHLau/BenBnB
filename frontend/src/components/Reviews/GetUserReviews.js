import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
// import {getSpotReviewsThunk} from "../../store/reviews"
import { getUserReviewsThunk } from "../../store/reviews";
import ReviewCard from "./ReviewCard";
// import { getAllSpotsThunk } from "../../store/spots";

function GetUserReviewsComponent() {
  // console.log("use params",useParams())
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const allReviews = useSelector((state) => state.reviews);
  const normalReviews = Object.values(allReviews);
  // console.log("ALL REVIEWS HERE ISDUJNKFSDIGJN", allReviews)
  console.log("ALL REVIEWS HERE NORMAL", normalReviews);
  useEffect(() => {
    dispatch(getUserReviewsThunk(spotId));
  }, [dispatch]);

  return (
    <>
      <div className="review-container">
        <div>
          <Link to={`/spots/${spotId}/reviews/new`}>HELLO</Link>
        </div>
        <div className="get-all-reviews">Reviews</div>

        <div className="review-middle-container">
          {normalReviews.map((review) => (
            <ReviewCard review={review}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default GetUserReviewsComponent;
