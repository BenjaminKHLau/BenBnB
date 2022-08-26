import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { getSpotReviewsThunk } from "../../store/reviews";
// import { getAllSpotsThunk } from "../../store/spots";
import { getSpotByIdThunk, deleteSpotThunk } from "../../store/spots"
import EditSpotFormComponent from "../EditSpot";
import EditFormModal from "../EditSpot/ModalEditSpot";
import GetAllReviewsComponent from "../Reviews";
import ReviewFormModal from "../Reviews/ReviewModal";
import "./spotId.css"

function GetSpotByIdComponent(){
    const history = useHistory()
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const allSpots = useSelector(state => state.spots)
    const theSpot = allSpots[spotId]
    const reviews = useSelector(state => Object.values(state.reviews))
    
    console.log("reviews", reviews)
    // const normalSpots = Object.values(allSpots)
    // console.log('all spots', allSpots)
    const session = useSelector(state => state.session)
    let currentUser = session.user
    let user;
    if(currentUser){user = currentUser.id}
    console.log("CURRENT USER ID", currentUser)
    // console.log('spot ID', spotId)
    console.log('the spot', theSpot)
    // console.log('the spot name', theSpot.spots[spotId].name)

    let isOwner = false
    if (theSpot?.ownerId && currentUser ){
        isOwner = theSpot?.ownerId === user
    }

    console.log("OWNER?", isOwner)

    
    useEffect(() => {
        dispatch(getSpotByIdThunk(spotId))
        dispatch(getSpotReviewsThunk(spotId))
    }, [dispatch])

    const deleteButton = e => {
        e.preventDefault();
        dispatch(deleteSpotThunk(spotId))
        // return(
        //     <Redirect to="/"></Redirect>
        // )
        history.push("/")
    }
    // if(!theSpot){return null}
    let spot = theSpot
    return (
        <div className="big-spot-container">
               {isOwner && (
                <div className="owner-option-buttons">
                    <EditFormModal spotId={spotId}/>
                    <button onClick={e=> deleteButton(e)}>Delete</button>
                </div>
                   )
                }

              <h1>
                {spot?.name}
                </h1> 
                {spot?.Images && <img src={spot?.Images[0]?.url || "https://hgtvhome.sndimg.com/content/dam/images/hgtv/unsized/2017/9/29/CI_TTMK_Charing-Cross-Road-1.jpg" }></img>}
            <div className="info-container">
                <p>Price: ${spot?.price}/night</p>
                <p>City: {spot?.city}</p>
                <p>Country: {spot?.country}</p>
                <p>Description: {spot?.description}</p>
                <p>Total Reviews: {spot?.numReviews}</p>
                <p>Average Review: {spot?.avgStarRating}</p>
            </div>
            {!isOwner && (<div className="review-modal">
                <ReviewFormModal />
            </div>)}
            <div className="spot-reviews-container">
                <GetAllReviewsComponent />
            </div>
        </div>
    )
}

export default GetSpotByIdComponent;