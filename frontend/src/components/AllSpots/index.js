import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllSpotsThunk } from "../../store/spots";


function GetAllSpots(){
    const dispatch = useDispatch()
    const allSpots = useSelector(state => state.spots)
    const normalSpots = Object.values(allSpots)
    // console.log('all spots', allSpots)

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    // if(!allSpots){return null}

    return (
        <div>
            <ul>
                {normalSpots.map(spot => (
                    <li key={spot?.id }>{spot?.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default GetAllSpots;