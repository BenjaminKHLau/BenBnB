import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, NavLink, useHistory } from "react-router-dom";
import { getCurrentUsersSpotsThunk } from "../../store/spots";
import { getUserBookingsThunk, deleteUserBookingThunk } from "../../store/bookings";
import { getAllSpotsThunk } from "../../store/spots";
import "./UserBookings.css";
import sorrykiwi from "../SPOTCARD/sorrykiwi.jpg";

function GetUserBookingsComponent() {
	const dispatch = useDispatch();
    const history = useHistory();
	const userBookingsObj = useSelector((state) => state.bookings);
	const bookingsArr = Object.values(userBookingsObj);
	const [isLoaded, setIsLoaded] = useState(false);
	const spotsObj = useSelector((state) => state.spots);
	const allSpots = Object.values(spotsObj);
	// console.log("booking spots,", spotsObj);

    const today = new Date()
    // let past = today > userBookingsObj[1].startDate 
    // console.log(today)
    // console.log(past)


	console.log("component userbookings: ", userBookingsObj)
	// console.log("component userbookings arr: ", bookingsArr);

	useEffect(() => {
		dispatch(getUserBookingsThunk())
			.then(() => dispatch(getAllSpotsThunk()))
			.then(() => setIsLoaded(true));
	}, []);


	return (
		isLoaded && (
			<div className="bookings-master">
				{/* TEST */}
				{bookingsArr.map((booking) => (
                    <div className="bookings-outer-map">
                            <Link to={`/spots/${booking.spotId}`} className="bookings-container">
							<img
								src={spotsObj[booking.spotId].previewImage}
								alt="lol"
								onError={(e) => (e.target.src = sorrykiwi)}
								className="bookings-img"
							/>
							<div className="booking-stuff">
								{booking.Spot.address}
								<div className="booking-check-in">
									From: {booking.startDate.slice(0, 10)}
								</div>
								<div className="booking-check-out">
									To: {booking.endDate.slice(0, 10)}
								</div>
							</div>
							<div className="booking-stuff2">
								Booked: {booking.createdAt.slice(0, 10)}
							</div>
                            </Link>
                            {today < new Date(booking.startDate) && (<button className="edit-delete"
                            onClick={() => dispatch(deleteUserBookingThunk(booking.id))}>
                                Delete
                </button>)}
						</div>
				))}
			</div>
		)
	);
}

export default GetUserBookingsComponent;
