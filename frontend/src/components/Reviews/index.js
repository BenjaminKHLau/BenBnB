import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect , useParams} from "react-router-dom";
import {deleteReviewThunk, getSpotReviewsThunk} from "../../store/reviews"
import { getSpotByIdThunk } from "../../store/spots";
import ReviewCard from "./ReviewCard";
// import { getAllSpotsThunk } from "../../store/spots";


function GetAllReviewsComponent(){
    // console.log("use params",useParams())
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const allReviews = useSelector(state => state.reviews)
    const normalReviews = Object.values(allReviews)
    
    const session = useSelector(state => state.session)
    let currentUser = session.user


    useEffect(() => {
        dispatch(getSpotReviewsThunk(spotId))
    }, [dispatch])

    const deleteReviewButton = async (reviewId) => {
       await dispatch(deleteReviewThunk(reviewId))
       await dispatch(getSpotByIdThunk(spotId))
    }

    return (
        <>
        <div className="review-container">

            <div>
                {/* <div onClick={()=><Redirect to={`/spots/${spotId}/reviews`}/>}>
                    Create a Review
                </div> */}
                {/* <Link to={`/spots/${spotId}/reviews/new`}>Create a Review</Link> */}
            </div>
            <div className="get-all-reviews">Reviews</div>
            
            <div className="review-middle-container">
                {normalReviews.map(review => (
                    <ReviewCard review={review} />
                ))}
            </div>

</div>
</>

)
}

export default GetAllReviewsComponent;