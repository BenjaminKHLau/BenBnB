import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, NavLink } from "react-router-dom";
import { getAllSpotsThunk } from "../../store/spots";


function GetAllSpots(){
    const dispatch = useDispatch()
    const allSpots = useSelector(state => state.spots)
    const normalSpots = Object.values(allSpots)
    console.log('all spots', normalSpots)

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    // if(!allSpots){return null}

    return (
        <div>
            <ul>
                {normalSpots.map(spot => (
                <div className="splash-spot-container">

                    <img src={spot?.previewImage || "https://hgtvhome.sndimg.com/content/dam/images/hgtv/unsized/2017/9/29/CI_TTMK_Charing-Cross-Road-1.jpg"} className="splash-spot-images"></img>
                    <li key={spot?.id}>
                   <NavLink to={`/spots/${spot.id}`}>
                        {spot?.name}
                   </NavLink>
                        </li>

                    <p>Price: ${spot?.price}/night</p>
                </div>
                ))}
            </ul>
        </div>
    )
}

export default GetAllSpots;