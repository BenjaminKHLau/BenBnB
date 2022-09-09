import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { addImageThunk, createNewSpotThunk } from "../../store/spots";

function CreateSpotFormComponent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validImages = ["png", "jpg", "jpeg", "svg", "heic", "gif"];

  useEffect(() => {
    let newImg = image.split("/");
    let imgX = newImg[newImg.length - 1].split(".")[1];
    // console.log(imgX)
    let errors = [];
    if (name.length === 0) errors.push("Name field is required");
    if (address.length === 0) errors.push("Address is required");
    if (city.length === 0) errors.push("City is required");
    if (state.length === 0) errors.push("State is required");
    if (country.length === 0) errors.push("Country is required");
    if (description.length === 0) errors.push("Description is required");
    if (price < 1) errors.push("Do you not want to make money?");
    if (image.length < 1) errors.push("Give me an image NOW");
    if (!validImages.includes(imgX))
      errors.push("Your image link must be in png, jpg, jpeg, svg, gif");
    setErrors(errors);
  }, [name, address, city, state, country, description, price, image]);

  // useEffect(() => {
  //     dispatch(createNewSpotThunk())
  //     .then (setIsLoaded(true))
  //     .catch(async (res) => {
  //       const data = await res.json();
  //       if (data && data.errors) setErrors(data.errors);
  //     })
  // }, [dispatch])

  async function subby(e) {
    e.preventDefault();
    setIsSubmitted(true);
    if (errors.length > 0) {
      return;
    }
    // console.log({
    //     name, address, city, state, lat, lng, country, description, price
    //   })
    const newSpot = await dispatch(
      createNewSpotThunk({
        name,
        address,
        city,
        state,
        lat,
        lng,
        country,
        description,
        price,
      })
    );
    dispatch(addImageThunk({ previewImage: true, url: image }, newSpot.id));
    history.push(`/spots/${newSpot.id}`);
  }

  const showErrors = errors.map((error) => (
    <li className="error-message" key={error}>
      {error}
    </li>
  ));

  return (
    <form className="spot-form" onSubmit={subby}>
      <h2 className="title">Create a Spot</h2>
      <ul className="errors">{isSubmitted && showErrors /*ED*/}</ul>

      <div className="form-css">
        <label className="form-stuff">
          {/* Name */}
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="form-stuff">
          {/* Address */}
          <input
            className="form-input"
            type="text"
            name="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>

        <label className="form-stuff">
          {/* City */}
          <input
            className="form-input"
            type="text"
            name="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>

        <label className="form-stuff">
          {/* State */}
          <input
            className="form-input"
            type="text"
            name="state"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>

        <label className="form-stuff">
          {/* Country */}
          <input
            className="form-input"
            type="text"
            name="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>

        <label className="form-stuff">
          {/* Latitude */}
          <input
            className="form-input"
            type="number"
            name="latitude"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </label>

        <label className="form-stuff">
          {/* Longitude */}
          <input
            className="form-input"
            type="number"
            name="longitude"
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
        </label>

        <label className="form-stuff">
          {/* Description */}
          <input
            className="form-input"
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label className="form-stuff">
          {/* Price */}
          <input
            className="form-input"
            type="number"
            name="price"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <label className="form-stuff">
          <input
            className="form-input"
            type="url"
            name="image"
            placeholder="Image Url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>

        <div className="submit">
          <button
            type="submit"
            disabled={isSubmitted && errors.length > 0} //ED
            className={
              isSubmitted && errors.length > 0 ? "noob" : "submit-button"
            }
          >
            Create Spot
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateSpotFormComponent;
