import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, NavLink, useHistory } from "react-router-dom";
import sorrykiwi from "../SPOTCARD/sorrykiwi.jpg";
import { getAllBookingsThunk } from "../../store/bookings";
// import { }

function SpotBookings({spotId}){
    const dispatch = useDispatch();
    const bookings = useSelector(state => state.bookings)
    const bookingsArr = Object.values(bookings)
    // console.log("SpotBookings component: ",bookingsArr)
    let filtered = bookingsArr.filter(booking => booking.spotId === +spotId)
    if(filtered.length > 10) filtered = filtered.slice(0, 10)
    console.log("filtered bookings",filtered)


    return filtered.length > 0 && (
        <>
        <div className="SpotBookings-title">Our Bookings</div>
            {filtered.map(booking => (
                <div>
                    {booking.startDate.slice(0,10)} to {booking.endDate.slice(0,10)} 
                </div>
            ))}

        </>
    )
}

export default SpotBookings