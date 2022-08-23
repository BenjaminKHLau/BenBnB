import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
// import { getAllSpotsThunk } from "../../store/spots";
import { getSpotByIdThunk } from "../../store/spots"


function GetSpotByIdComponent(){
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const theSpot = useSelector(state => state)
    // const normalSpots = Object.values(allSpots)
    // console.log('all spots', allSpots)

    // console.log('spot ID', spotId)
    // console.log('the spot', theSpot)
    // console.log('the spot name', theSpot.spots[spotId].name)

    useEffect(() => {
        dispatch(getSpotByIdThunk(spotId))
    }, [dispatch])

    // if(!allSpots){return null}

    return (
        <div>
              <h1>
                {theSpot?.spots[spotId]?.name}
                </h1> 
        </div>
    )
}

export default GetSpotByIdComponent;