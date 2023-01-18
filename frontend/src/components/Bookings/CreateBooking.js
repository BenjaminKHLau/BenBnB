import React, { useEffect, useState } from "react";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange, DateRangePicker } from 'react-date-range';
import { Calendar } from 'react-date-range';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewBookingThunk, getAllBookingsThunk } from "../../store/bookings";

function CreateBookingFormComponent(){
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [startDate, setStartDate] = useState({date: new Date().toISOString().slice(0, 10)})
    const [endDate, setEndDate] = useState({date: new Date().toISOString().slice(0, 10)})
    const [errors, setErrors] = useState([])
    const session = useSelector((state) => state.session)
    const [handleSelect, setHandleSelect] = useState()
    const bookingsState = useSelector(state => state.bookings)

    const today = new Date().toISOString().slice(0,10)
    // console.log(today)
    console.log("bookings state ",bookingsState)
    // .split(0, 10)
    
    
    
    
    // console.log("session", session.user.id)
    // console.log("CREATE", useParams())


    useEffect(() => {
        setIsLoaded(true)
        // dispatch(getAllBookingsThunk(spotId))
        let errors = []

        if (today > startDate) errors.push("You cannot book something in the past")
        if (startDate > endDate) errors.push("Start date must be before End date!")
        // console.log("todays date use effect:", today.split(0, 10))
        // console.log("start date use effect:", startDate)
        setErrors(errors)
    },[startDate, endDate, today])

    async function handleSubmit(e){
        e.preventDefault();
        setIsSubmitted(true)
        if (today > startDate){
            return
        }
        const newBooking = await dispatch(
            createNewBookingThunk({
                spotId: Number(spotId),
                startDate: startDate.slice(0, 10),
                endDate: endDate.slice(0, 10),
                userId: session?.user?.id
            }, +spotId)
        )
        // console.log("handling submit", JSON.stringify(newBooking))
        // console.log("handling submit", newBooking)
        // return newBooking

    }

    const showErrors = errors.map((error) => (
        <div className="error-message" key={error}>
          {error}
        </div>
      ));


    return isLoaded && (
        <form className="booking-form" onSubmit={handleSubmit}>
            <h2 className="title">Book Your Visit!</h2>
            <ul className="errors">{isSubmitted && showErrors}</ul>

            <label className="form-stuff">
                From
            <input
                className="form-input"
                type="date"
                // required pattern="\d{4}-\d{2}-\d{2}"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value.slice(0, 10))}
             />
        </label>

            <label className="form-stuff">
                To
            <input
                className="form-input"
                type="date"
                // required pattern="\d{4}-\d{2}-\d{2}"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value.slice(0, 10))}
             />
        </label>
        <div className="submit">
          <button
            type="submit"
            disabled={isSubmitted && errors.length > 0}
            className={
              isSubmitted && errors.length > 0 ? "noob" : "submit-button"
            }
          >
            Confirm Booking
          </button>
        </div>
            
        </form>
        // <Calendar date={new Date()}
        // onChange={e=>setHandleSelect(e.target.value)} 
        // />
        // <>
        // <DateRange />
        // </>
    )
}

export default CreateBookingFormComponent