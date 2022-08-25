import "./SpotCardComponent.css"
import { NavLink } from "react-router-dom";

function SpotCardComponent({spot}) {
  return (
    <div className="main-container">
      <NavLink to={`/spots/${spot.id}`}>
        <div className="just-the-image">
          <img
            src={
              spot?.previewImage ||
              "https://hgtvhome.sndimg.com/content/dam/images/hgtv/unsized/2017/9/29/CI_TTMK_Charing-Cross-Road-1.jpg"
            }
            className="splash-spot-images"
          ></img>
        </div>

        <div className="align-text-star-div">
          <div className="individual-spot-info">
            {/* {spot?.name} {"| "}  */}
            {spot.city} {"| "}
            {spot.state}
          </div>
          <div className="star-rating-home">
            <img
              src="https://img.freepik.com/free-vector/start_53876-25533.jpg?w=1480&t=st=1661381445~exp=1661382045~hmac=6734002d945e88c679e73d02b65c3877373dc194b59e278846d601e206773cca"
              className="star-rating-home-img"
            ></img>{" "}
            {spot.avgRating}
          </div>
        </div>
        <p>${spot.price} night</p>
      </NavLink>
      {/* <div className="just-the-price"> */}
      {/* </div> */}
    </div>
  );
}

export default SpotCardComponent