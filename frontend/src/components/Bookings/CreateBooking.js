import React, { useEffect, useState } from "react";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange, DateRangePicker } from 'react-date-range';
import { addDays } from "date-fns";
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
    // const [startDate, setStartDate] = useState({date: new Date().toISOString().slice(0, 10)})
    // const [endDate, setEndDate] = useState({date: new Date().toISOString().slice(0, 10)})
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [errors, setErrors] = useState([])
    const session = useSelector((state) => state.session)
    const [handleSelect, setHandleSelect] = useState()
    const bookingsState = useSelector(state => state.bookings)
    const spotState = useSelector(state => state.spots)
    const currSpot = spotState[spotId]
    const bookingArr = Object.values(bookingsState)

    const today = new Date().toISOString().slice(0,10)
    // console.log(today)
    // console.log("bookings state ",bookingsState)
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
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                userId: session?.user?.id
            }, +spotId)
        )
        // console.log("handling submit", JSON.stringify(newBooking))
        // console.log("handling submit", newBooking)
        // return newBooking
        if (newBooking){
          history.push(`/bookings/current`)
        }

    }

    const selected = (ranges) => {
      setStartDate(ranges.selection.startDate)
      setEndDate(ranges.selection.endDate)
      console.log("ranges",startDate, " to ", endDate)
    }

    const selectionRange = {
      startDate: startDate,
      endDate: endDate,
      key: 'selection',
    }

    // Thank you Kelly for code snippets :)
    let currSpotBooked;
    if (bookingArr.length > 0) {
      currSpotBooked = bookingArr.filter(booking => booking.spotId === currSpot.id)
    }
    let disabledDates = []
    currSpotBooked?.forEach(booking => {
      let start = new Date(booking.startDate)

  
      let end = new Date(booking.endDate)
  
      while (start <= end) {
        disabledDates.push(new Date(start))
        start.setDate(start.getDate() + 1)
      }
      return disabledDates
    })
    // console.log("disabled dates",disabledDates)

    const showErrors = errors.map((error) => (
        <div className="error-message" key={error}>
          {error}
        </div>
      ));

      

    return isLoaded && (
        // <form className="booking-form" onSubmit={handleSubmit}>
        //     <h2 className="title">Book Your Visit!</h2>
        //     <ul className="errors">{isSubmitted && showErrors}</ul>

        //     <label className="form-stuff">
        //         From
        //     <input
        //         className="form-input"
        //         type="date"
        //         // required pattern="\d{4}-\d{2}-\d{2}"
        //         name="startDate"
        //         value={startDate}
        //         onChange={(e) => setStartDate(e.target.value.slice(0, 10))}
        //      />
        // </label>

        //     <label className="form-stuff">
        //         To
        //     <input
        //         className="form-input"
        //         type="date"
        //         // required pattern="\d{4}-\d{2}-\d{2}"
        //         name="endDate"
        //         value={endDate}
        //         onChange={(e) => setEndDate(e.target.value.slice(0, 10))}
        //      />
        // </label>
        // <div className="submit">
        //   <button
        //     type="submit"
        //     disabled={isSubmitted && errors.length > 0}
        //     className={
        //       isSubmitted && errors.length > 0 ? "noob" : "submit-button"
        //     }
        //   >
        //     Confirm Booking
        //   </button>
        // </div>
            
        // </form>
        // <Calendar date={new Date()}
        // onChange={e=>setHandleSelect(e.target.value)} 
        // />
        <form onSubmit={handleSubmit}>

        <DateRange
         onChange={selected}
         editableDateInputs={true}
         moveRangeOnFirstSelection={false}
         direction="horizontal"
         minDate={addDays(new Date(), 1)}
         ranges={[selectionRange]}
         disabledDates={disabledDates}
         />
        <button className={
              isSubmitted && errors.length > 0 ? "noob2" : "submit-button2"
            } type="submit">Reserve Booking</button>
         </form>

    )
}

export default CreateBookingFormComponent