import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotReviewsThunk, deleteReviewThunk } from "../../store/reviews";
import { getSpotByIdThunk } from "../../store/spots";
import ReviewFormModal from "./ReviewModal";
import "./review.css"
import yellowstar from "../AllSpots/yellowstar.png"
import kiwiportrait from './kiwiportrait.png'

function ReviewCard({ review }) {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const allSpots = useSelector((state) => state.spots);
  const theSpot = allSpots[spotId];

  const session = useSelector((state) => state.session);
  let currentUser = session.user;

  // let currentUser = session.user;
  let user;
  if (currentUser) {
    user = currentUser.id;
  }
  let isOwner = false;
  if (theSpot?.ownerId && currentUser) {
    isOwner = theSpot?.ownerId === user;
  }
  
  const spot = useSelector(state => state)
  // console.log("spot useselector",spot)

  const deleteReviewButton = async (reviewId) => {
    await dispatch(deleteReviewThunk(reviewId));
    await dispatch(getSpotByIdThunk(spotId));
  };

  // const date = Date(review?.createdAt)
  // console.log(date.getMonth())
  // console.log((Date(review?.createdAt)).toLocaleString())
  // console.log((Date(review?.createdAt)))
  // console.log(join(date, [{month: 'short'}, {year: 'numeric'}], " "))

  // let date = new Date(2010, 7, 5);
  // let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  // let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
  // let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
// console.log(`${day}-${month}-${year}`);

  // console.log("review card review", review);
  // console.log("review card session", session);
  return (
    <div className="review">
      <div className="kiwibox">

      <div className="kiwiport"><img src={kiwiportrait} className="kiwiport" /></div>
      <div className="review-loc-rev">
        <div className="review-location">Location: {review?.Spot?.name || spot?.spots[spotId]?.name}</div>
        <div className="review-author">Review By: {review?.User?.firstName ||session?.user?.firstName}</div>
      </div>
      </div>

      <div className="review-date">{(Date(review?.createdAt)).toLocaleString().split(" ")[1]} {(Date(review?.createdAt)).toLocaleString().split(" ")[3]}</div>
      
      <div className="review-textbox">
      <div className="review-text">{review.review}</div>
      </div>

      
      <div className="review-stars"><img src={yellowstar} className="star-rating-home-img"/>{review.stars}</div>

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
