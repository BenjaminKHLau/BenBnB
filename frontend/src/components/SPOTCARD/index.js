import "./SpotCardComponent.css"
import { NavLink } from "react-router-dom";
import yellowstar from "../AllSpots/yellowstar.png"
import sorrykiwi from "./sorrykiwi.jpg"
function SpotCardComponent({spot}) {
  return (
    <div className="main-container">
      <NavLink to={`/spots/${spot.id}`}>
        <div className="just-the-image">
          <img src={spot?.previewImage || sorrykiwi}
            alt="if your image link doesn't work, please wait for default to load"
            onError={e => {
              e.target.src=sorrykiwi
              // e.onerror=null
            }}
            className="splash-spot-images"
          ></img>
        </div>

        <div className="align-text-star-div">
          <div className="individual-spot-info">
            {/* {spot?.name} {"| "}  */}
            {spot?.city}{", "}
            {spot?.state}
          </div>
          <div className="star-rating-home">
            <img
              src={yellowstar}
              className="star-rating-home-img"
            ></img>{" "}
            {spot?.avgRating}
          </div>
        </div>
            <div className="desc-space">{spot?.description}</div>
        <div className="spotcard-price">
        {/* <div className="spot-price-text">${spot.price}</div> */}
        <div className="desc-space">Available Soon!</div>
        <div className="spotcard-money">${spot?.price} night</div>
        </div>

      </NavLink>
      {/* <div className="just-the-price"> */}
      {/* </div> */}
    </div>
  );
}

export default SpotCardComponent