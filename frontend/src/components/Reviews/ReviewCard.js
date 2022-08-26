import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotReviewsThunk, deleteReviewThunk } from "../../store/reviews";
import { getSpotByIdThunk } from "../../store/spots";


function ReviewCard({ review }) {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const deleteReviewButton = async (reviewId) => {
    await dispatch(deleteReviewThunk(reviewId));
    await dispatch(getSpotByIdThunk(spotId));
  };

  const session = useSelector((state) => state.session);
  let currentUser = session.user;
  return (
    <div className="review">
      {/* <div className="review-author">
                        {" Review By User ID: "}{review.userId}
                    </div> */}
      <div className="review-text">
        {review.review}
        <div className="review-stars">
          {" STARS: "}
          {review.stars}
        </div>

        {currentUser && currentUser.id === review.userId && (
          <div>
            <button
              className="delete-review-button"
              onClick={() => {
                deleteReviewButton(review.id);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewCard;
