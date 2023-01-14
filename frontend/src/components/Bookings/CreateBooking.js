import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewBookingThunk } from "../../store/bookings";

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
    
    
    
    // console.log("session", session.user.id)
    // console.log("CREATE", useParams())


    useEffect(() => {
        setIsLoaded(true)
        let errors = []


        setErrors(errors)
    },[startDate, endDate])

    async function handleSubmit(e){
        e.preventDefault();
        setIsSubmitted(true)
        const newBooking = await dispatch(
            createNewBookingThunk({
                spotId: Number(spotId),
                startDate,
                endDate,
                userId: session?.user?.id
            }, +spotId)
        )

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
                name="startDate"
                // placeholder="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
             />
        </label>

            <label className="form-stuff">
                To
            <input
                className="form-input"
                type="date"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
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
    )
}

export default CreateBookingFormComponent