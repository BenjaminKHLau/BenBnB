import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createNewSpotThunk } from "../../store/spots"


function CreateSpotFormComponent(){
    const dispatch = useDispatch()
    const history = useHistory()
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [errors, setErrors] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)


    useEffect(() => {
        let errors = []
        if (name.length === 0) errors.push("Name field is required")
        if (address.length === 0) errors.push("Address is required")
        if (city.length === 0) errors.push("City is required")
        if (state.length === 0) errors.push("State is required")
        if (country.length === 0) errors.push("Country is required")
        if (description.length === 0) errors.push("Description is required")
        if (price < 1) errors.push("Do you not want to make money?")
        setErrors(errors)
      },[name, address, city, state, country, description, price])

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
        console.log({
            name, address, city, state, lat, lng, country, description, price
          })
          await dispatch(createNewSpotThunk({
            name, address, city, state, lat, lng, country, description, price
          }))
        history.push("/")
      }
    
      const showErrors = errors.map(error => (
        <li key={error}>{error}</li>
      ))
      
      return (
        <form
          className="spot-form"
          onSubmit={subby}
        >
          <h2>Create a Spot</h2>
          <ul className="errors">
            {showErrors}
          </ul>
          
          <div className="form-css">

          <label>
            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
          </label>

        
          <label>
            {/* Address */}
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              />
          </label>

        
          <label>
            {/* City */}
            <input
              type="text"
              name="city"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              />
          </label>

        
          <label>
            {/* State */}
            <input
              type="text"
              name="state"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              />
          </label>

        
          <label>
            {/* Country */}
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              />
          </label>

        
          <label>
            {/* Latitude */}
            <input
              type="number"
              name="latitude"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              />
          </label>

        

          <label>
            {/* Longitude */}
            <input
              type="number"
              name="longitude"
              placeholder="Longitude"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              />
          </label>

          <label>
            {/* Description */}
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              />
          </label>

          <label>
            {/* Price */}
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              />
          </label>
          <button
            type="submit"
            disabled={errors.length > 0}
            >
            Create Spot
          </button>
            </div>
        </form>
      );
}

export default CreateSpotFormComponent