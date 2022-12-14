import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, NavLink } from "react-router-dom";
import { getAllSpotsThunk } from "../../store/spots";
import "./AllSpots.css"
import SpotCardComponent from "../SPOTCARD";
import payphone from "./Payphone.mp3"

function GetAllSpots(){
    const dispatch = useDispatch()
    const allSpots = useSelector(state => state.spots)
    const normalSpots = Object.values(allSpots)
    // console.log('all spots', normalSpots)

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    // if(!allSpots){return null}

    return (
        <div className="outer-container">

            <div className="middle-container">
                {normalSpots.map(spot => (
                    <div className="inner-container">
                        <SpotCardComponent spot={spot}/>
                    </div>
                    //take from here
                ))}
                </div>
                {/* <embed src={payphone} loop={true} autostart="true" width="2" height="0" /> */}
        </div>
    )
}

export default GetAllSpots;