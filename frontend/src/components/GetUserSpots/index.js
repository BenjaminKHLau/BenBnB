import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, NavLink } from "react-router-dom";
import { getCurrentUsersSpotsThunk } from "../../store/spots";
// import "./AllSpots.css"
import SpotCardComponent from "../SPOTCARD";


function GetUserSpotsComponent(){
    const dispatch = useDispatch()
    const allSpots = useSelector(state => state.spots)
    // const currentUser = allSpots?.session?.user?.id
    // console.log(`CURRENT USER`, currentUser)
    // console.log("ALL SPOTS OF CURRENT USERRRRRRRR",allSpots)
    const normalSpots = Object.values(allSpots)
    // const mySpots = normalSpots[1]
    // console.log(mySpots)
    // console.log('all spots current user ******', normalSpots)

    useEffect(() => {
        dispatch(getCurrentUsersSpotsThunk())
    }, [dispatch])

    // if(!allSpots){return null}
    // const spot = allSpots?.spots
    return (
        <div className="main-container">

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