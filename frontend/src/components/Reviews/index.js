import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect , useParams} from "react-router-dom";
import {getSpotReviewsThunk} from "../../store/reviews"

// import { getAllSpotsThunk } from "../../store/spots";


function GetAllReviewsComponent(){
    // console.log("use params",useParams())
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const allReviews = useSelector(state => state.reviews)
    const normalReviews = Object.values(allReviews)
    // console.log("ALL REVIEWS HERE ISDUJNKFSDIGJN", allReviews)
    // console.log("ALL REVIEWS HERE NORMAL", normalReviews)
    useEffect(() => {
        dispatch(getSpotReviewsThunk(spotId))
    }, [dispatch])


    return (
        <>
        <div className="review-container">

            <div>
                {/* <div onClick={()=><Redirect to={`/spots/${spotId}/reviews`}/>}>
                    Create a Review
                </div> */}
                <Link to={`/spots/${spotId}/reviews/new`}>Create a Review</Link>
            </div>
            <div className="get-all-reviews">Reviews</div>
            
            <div className="review-middle-container">
                {normalReviews.map(review => (
                    <div className="review">
                    {/* <div className="review-author">
                        {" Review By User ID: "}{review.userId}
                    </div> */}
                    <div className="review-text">
                        {review.review}
                    <div className="review-stars">
                        {" STARS: "}{review.stars}
                    </div>

                    </div>
                    </div>
                ))}
            </div>

</div>
</>

)
}

export default GetAllReviewsComponent;