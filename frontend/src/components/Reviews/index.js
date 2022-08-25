import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {getSpotReviewsThunk} from "../../store/reviews"
// import { getAllSpotsThunk } from "../../store/spots";


function GetAllReviewsComponent(){
    const dispatch = useDispatch()
    const allReviews = useSelector(state => state.spots)

    useEffect(() => {
        dispatch(getSpotReviewsThunk())
    }, [dispatch])


    return (
        <div className="get-all-reviews">Reviews</div>

    )
}

export default GetAllReviewsComponent;