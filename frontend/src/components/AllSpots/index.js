import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, NavLink } from "react-router-dom";
import { getAllSpotsThunk } from "../../store/spots";
import "./AllSpots.css"


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
        <div className="main-container">

            <div className="middle-container">
                {normalSpots.map(spot => (
                    <div className="inner-container">
                   <NavLink to={`/spots/${spot.id}`}>

                    <div className="just-the-image">
                    <img src={spot?.previewImage || "https://hgtvhome.sndimg.com/content/dam/images/hgtv/unsized/2017/9/29/CI_TTMK_Charing-Cross-Road-1.jpg"} className="splash-spot-images"></img>
                    </div>

                    {/* <div key={spot?.id}> */}

                    <div className="align-text-star-div">
                    <div className="individual-spot-info">
                        {/* {spot?.name} {"| "}  */}
                        {spot?.city} {"| "}
                        {spot?.state}
                        </div>
                        <div className="star-rating-home">
                            <img src="https://img.freepik.com/free-vector/start_53876-25533.jpg?w=1480&t=st=1661381445~exp=1661382045~hmac=6734002d945e88c679e73d02b65c3877373dc194b59e278846d601e206773cca" className="star-rating-home-img">
                                </img> {spot?.avgRating}</div>
                    </div>
                   <p>${spot?.price} night</p>
                   </NavLink>
                   {/* <div className="just-the-price"> */}
                   {/* </div> */}

                    </div>
                ))}
                </div>

        </div>
    )
}

export default GetAllSpots;