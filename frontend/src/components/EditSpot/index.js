import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createNewSpotThunk, getCurrentUsersSpotsThunk, getSpotByIdThunk, updateSpotThunk } from "../../store/spots"


function EditSpotFormComponent({spotId}){
    const dispatch = useDispatch()
    const history = useHistory()

    const spots = useSelector(state => state.spots)
    // console.log("edit spot",spots[spotId])
    const spot = spots[spotId]
    // console.log(spot)


    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [lat, setLat] = useState(spot.lat)
    const [lng, setLng] = useState(spot.lng)
    const [name, setName] = useState(spot.name)
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)
    // const [image, setImage] = useState("")
    const [errors, setErrors] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)

    
    const validImages = ["png" , "jpg" ,"jpeg", "svg", "heic", "gif"]

    useEffect(() => {
      // let newImg = image.split("/")
      // let imgX = newImg[newImg.length - 1].split(".")[1]
        let errors = []
        if (name.length === 0) errors.push("Name is required");
        if (address.length === 0) errors.push("Address is required");
        if (city.length === 0) errors.push("City is required");
        if (state.length === 0) errors.push("State is required");
        if (country.length === 0) errors.push("Country is required");
        if (description.length === 0) errors.push("Describe your spot");
        if (price < 1) errors.push("Enter a price. Do you not want to make money?");
        if (lat.length < 1) errors.push("Enter latitude between -90 and 90");
        if (lat < -90 || lat > 90) errors.push("Enter latitude between -90 and 90");
        if (lng.length < 1) errors.push("Enter longitude between -180 and 180");
        if (lng < -180 || lng > 180) errors.push("Enter longitude between -180 and 180");
        // if (image.length < 1 ) errors.push("Give me an image NOW")
        // if (!validImages.includes(imgX)) errors.push("Your image link must be in png, jpg, jpeg, svg, gif")
        setErrors(errors)
      },[name, address, city, state, country, description, price, lat, lng])

    // useEffect(() => {
    //     dispatch(createNewSpotThunk())
    //     .then (setIsLoaded(true))
    //     .catch(async (res) => {
    //       const data = await res.json();
    //       if (data && data.errors) setErrors(data.errors);
    //     })
    // }, [dispatch])


    async function subby(e){
        e.preventDefault()
        setIsSubmitted(true)
        // console.log({
        //     name, address, city, state, lat, lng, country, description, price
        //   })
         await dispatch(updateSpotThunk({
            name, address, city, state, lat, lng, country, description, price
          }, spotId))
        // history.push(`/`)
        // await dispatch(getCurrentUsersSpotsThunk())
          await dispatch(getSpotByIdThunk(spotId))
      }
    
      const showErrors = errors.map(error => (
        <li className="error-message" key={error}>{error}</li>
      ))
      
      return (
        <form
          className="spot-form"
          onSubmit={subby}
        >
          <h2 className="title">Edit Your Spot</h2>
          <ul className="errors">
            {isSubmitted && showErrors}
          </ul>
          
          <div className="form-css">
            <div className="form-box">


          <label className="form-stuff">
            {/* Name */}
            <input className="form-input"
              type="text"
              name="name"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
              />
          </label>

        
          <label className="form-stuff">
            {/* Address */}
            <input className="form-input"
              type="text"
              name="address"
              value={address}
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
              />
          </label>

        
          <label className="form-stuff">
            {/* City */}
            <input className="form-input"
              type="text"
              name="city"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              />
          </label>

        
          <label className="form-stuff">
            {/* State */}
            <input className="form-input"
              type="text"
              name="state"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              />
          </label>

        
          <label className="form-stuff">
            {/* Country */}
            <input className="form-input"
              type="text"
              name="country"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              />
          </label>

        
          <label className="form-stuff">
            {/* Latitude */}
            <input className="form-input"
              type="number"
              name="latitude"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              />
          </label>

        

          <label className="form-stuff">
            {/* Longitude */}
            <input className="form-input"
              type="number"
              name="longitude"
              placeholder="Longitude"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              />
          </label>

          <label className="form-stuff">
            {/* Description */}
            <input className="form-input"
              type="text"
              name="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              />
          </label>

          <label className="form-stuff">
            {/* Price */}
            <input className="form-input2"
              type="number"
              name="price"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              />
          </label>
            </div>
          

          <div className="submit">

          <button
            type="submit"
            disabled={isSubmitted && errors.length > 0}
            className={(isSubmitted && errors.length > 0) ? "noob":"submit-button"}
            >
            Confirm Spot Changes
          </button>
              </div>
            </div>
        </form>
      );
}

export default EditSpotFormComponent