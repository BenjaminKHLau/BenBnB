import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { createNewReviewThunk } from "../../store/reviews";
import { getSpotByIdThunk } from "../../store/spots";


function CreateReviewFormComponent({closeModal}){
    const dispatch = useDispatch()
    const history = useHistory()
    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")
    const [errors, setErrors] = useState([])
    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const reviews = useSelector(state => Object.values(state.reviews));
    const allReviews = reviews.map(review => review.userId === sessionUser.id)
    const [isSubmitted, setIsSubmitted] = useState(false);

    // console.log("new Review state",reviews.map(review => review.userId === sessionUser.id))
    // console.log("all Reviews", allReviews.includes(true))

    // console.log("use Params REVIEWS COMP",useParams())

    useEffect(() => {
        let errors = []
        if (allReviews.includes(true)) errors.push("You have already reviewed this spot!")
        else if (stars < 1 || stars > 5) errors.push("Please give a rating between 1 - 5")
        else if (review.length < 1) errors.push("Please enter a review")
        setErrors(errors)
      },[review, stars])


    async function subby(e){
        e.preventDefault()
        setIsSubmitted(true)
        if(errors.length > 0){
          return;
        }
        // console.log({
        //     review, stars, spotId
        //   })
          await dispatch(createNewReviewThunk(
            review, stars, spotId
          ))
          await dispatch(getSpotByIdThunk(spotId))
          closeModal()
        // history.push("/spo")
      }

      // async function subby2(e){
      //   e.preventDefault()
      //   await dispatch(getSpotByIdThunk(spotId))
      //   closeModal()
      // }

      const showErrors = errors.map(error => (
        <li className="error-message" key={error}>{error}</li>
      ))


return (
    <>
    <form
          className="spot-form"
          onSubmit={subby}
        >
          <h2 className="title">Create a Review</h2>
          <ul className="errors">
            {isSubmitted && showErrors}
          </ul>
          
          <div className="form-css">

          
          <label className="form-stuff">
            <input className="form-input"
              type="number"
              min={1}
              max={5}
              name="stars"
              placeholder="Stars"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              />
          </label>

          <label className="form-stuff">
            <input className="form-input"
              type="review"
              name="review"
              placeholder="Write your Review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              />
          </label>

        <div className="submit">

          <button
            type="submit"
            disabled={isSubmitted && errors.length > 0}
            className={isSubmitted && errors.length > 0 ? "noob":"submit-button"}
            // onClick={()=>subby2}
            >
            Create Review
          </button>

              </div>
            </div>
        </form>
    </>
)

}
export default CreateReviewFormComponent