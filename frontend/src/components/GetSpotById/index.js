import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
// import { getAllSpotsThunk } from "../../store/spots";
import { getSpotByIdThunk, deleteSpotThunk } from "../../store/spots"


function GetSpotByIdComponent(){
    const history = useHistory()
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const theSpot = useSelector(state => state)
    // const normalSpots = Object.values(allSpots)
    // console.log('all spots', allSpots)

    // console.log('spot ID', spotId)
    console.log('the spot', theSpot)
    // console.log('the spot name', theSpot.spots[spotId].name)

    useEffect(() => {
        dispatch(getSpotByIdThunk(spotId))
    }, [dispatch])

    const deleteButton = e => {
        e.preventDefault();
        dispatch(deleteSpotThunk(spotId))
        // return(
        //     <Redirect to="/"></Redirect>
        // )
        history.push("/")
    }
    if(!theSpot){return null}
    let spot = theSpot.spots[spotId]
    return (
        <div>
              <h1>
                {theSpot?.spots[spotId]?.name}
                <button onClick={e=> deleteButton(e)}>Delete</button>
                </h1> 
                <img src={spot?.Images[0]?.url}></img>
                <p>Price: ${spot?.price}/night</p>
                <p>City: {spot?.city}</p>
                <p>Country: {spot?.country}</p>
                <p>Description: {spot?.description}</p>
                <p>Total Reviews: {spot?.numReviews}</p>
                <p>Average Review: {spot?.avgStarRating}</p>
        </div>
    )
}

export default GetSpotByIdComponent;