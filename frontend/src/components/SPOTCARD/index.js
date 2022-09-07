import "./SpotCardComponent.css"
import { NavLink } from "react-router-dom";
import yellowstar from "../AllSpots/yellowstar.png"
function SpotCardComponent({spot}) {
  return (
    <div className="main-container">
      <NavLink to={`/spots/${spot.id}`}>
        <div className="just-the-image">
          <img src={spot?.previewImage 
              ||
              "https://hgtvhome.sndimg.com/content/dam/images/hgtv/unsized/2017/9/29/CI_TTMK_Charing-Cross-Road-1.jpg"
            }
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
        <p>${spot?.price} night</p>
        </div>

      </NavLink>
      {/* <div className="just-the-price"> */}
      {/* </div> */}
    </div>
  );
}

export default SpotCardComponent