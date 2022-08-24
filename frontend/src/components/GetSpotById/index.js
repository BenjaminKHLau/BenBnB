import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
// import { getAllSpotsThunk } from "../../store/spots";
import { getSpotByIdThunk, deleteSpotThunk } from "../../store/spots"
import EditSpotFormComponent from "../EditSpot";
import EditFormModal from "../EditSpot/ModalEditSpot";


function GetSpotByIdComponent(){
    const history = useHistory()
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const allSpots = useSelector(state => state.spots)
    const theSpot = allSpots[spotId]
    // const normalSpots = Object.values(allSpots)
    // console.log('all spots', allSpots)

    // console.log('spot ID', spotId)
    // console.log('the spot', theSpot)
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
    let spot = theSpot
    return (
        <div className="big-spot-container">
                <EditFormModal spotId={spotId}/>
              <h1>
                {spot.name}
                <button onClick={e=> deleteButton(e)}>Delete</button>
                </h1> 
                {spot?.Images && <img src={spot?.Images[0]?.url}></img>}
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