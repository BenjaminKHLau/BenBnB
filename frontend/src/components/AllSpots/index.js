import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllSpotsThunk } from "../../store/spots";


function GetAllSpots(){
    const dispatch = useDispatch()
    const allSpots = useSelector(state => state.spots)
    console.log('all spots', allSpots)

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])


    return (
        <div>
        <div className="get-all-spots">Get All Spots</div>
        {/* <Redirect exact path="/"></Redirect> */}
        </div>
    )
}

export default GetAllSpots;