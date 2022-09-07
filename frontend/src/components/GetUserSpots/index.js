import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, NavLink } from "react-router-dom";
import { getCurrentUsersSpotsThunk } from "../../store/spots";
// import "./AllSpots.css"
import SpotCardComponent from "../SPOTCARD";


function GetUserSpotsComponent(){
    const dispatch = useDispatch()
    const allSpots = useSelector(state => state.spots)
    const normalSpots = Object.values(allSpots)

    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        dispatch(getCurrentUsersSpotsThunk()).then(()=>setIsLoaded(true))
    }, [dispatch])

    // if(!allSpots){return null}
    // const spot = allSpots?.spots

    return isLoaded && (
        <div className="review-container">
            <div className="get-all-reviews">Your Spots</div>

            <div className="middle-container">
            {normalSpots.map(spot => (
                    <div className="inner-container">
                        <SpotCardComponent spot={spot}/>
                    </div>
                ))}
                </div>

        </div>
    )
}

export default GetUserSpotsComponent;