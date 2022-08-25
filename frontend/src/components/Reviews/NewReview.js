import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { createNewReviewThunk } from "../../store/reviews";
import { getSpotByIdThunk } from "../../store/spots";


function CreateReviewFormComponent(){
    const dispatch = useDispatch()
    const history = useHistory()
    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")
    const [errors, setErrors] = useState([])
    const { spotId } = useParams()

    console.log("use Params REVIEWS COMP",useParams())

    useEffect(() => {
        let errors = []
        if (review.length < 1) errors.push("Please enter a review")
        if (stars < 1) errors.push("Please give a rating between 1 - 5")
        setErrors(errors)
      },[review, stars])


    async function subby(e){
        e.preventDefault()
        console.log({
            review, stars, spotId
          })
          await dispatch(createNewReviewThunk(
            review, stars, spotId
          ))
          await dispatch(getSpotByIdThunk(spotId))
        // history.push("/spo")
      }

      const showErrors = errors.map(error => (
        <li key={error}>{error}</li>
      ))


return (
    <>
    <form
          className="spot-form"
          onSubmit={subby}
        >
          <h2>Create a Review</h2>
          <ul className="errors">
            {showErrors}
          </ul>
          
          <div className="form-css">

          
          <label>
            <input
              type="number"
              name="stars"
              placeholder="Stars"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              />
          </label>

          <label>
            <input
              type="review"
              name="review"
              placeholder="Write your Review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              />
          </label>

          <button
            type="submit"
            disabled={errors.length > 0}
            >
            Create Review
          </button>
            </div>
        </form>
    </>
)

}
export default CreateReviewFormComponent