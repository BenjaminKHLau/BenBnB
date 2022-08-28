import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotReviewsThunk, deleteReviewThunk } from "../../store/reviews";
import { getSpotByIdThunk } from "../../store/spots";
import "./review.css"

function ReviewCard({ review }) {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const deleteReviewButton = async (reviewId) => {
    await dispatch(deleteReviewThunk(reviewId));
    await dispatch(getSpotByIdThunk(spotId));
  };
  console.log("review card review", review);
  const session = useSelector((state) => state.session);
  let currentUser = session.user;
  return (
    <div className="review">
      <div className="review-location">Location: {review?.Spot?.name}</div>
      <div className="review-author">Review By: {review?.User?.firstName}</div>
      <div className="review-text">{review.review}</div>
      <div className="review-stars">STARS: {review.stars}</div>

      {currentUser && currentUser.id === review.userId && (
        <div>
          <div className="delete-review-button" onClick={() => {
              deleteReviewButton(review.id);
            }}
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewCard;
