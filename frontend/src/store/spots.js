import { csrfFetch } from "./csrf";


// Action Types
const CREATE_NEW_SPOT = "spots/CREATE"
const GET_ALL_SPOTS = "spots/READ"
const UPDATE_SPOT = "spots/UPDATE"
const DELETE_SPOT = "spots/DELETE"
const GET_SPOT_BY_ID = "spotsId/READ"
const GET_USER_SPOTS = "userSpots/READ"



// Action Creator
const createNewSpot = (payload) => {
   return { 
    type: CREATE_NEW_SPOT,
    payload 
   }
}

const getAllSpots = (payload /* data.Spots */) => {
    // console.log("payload", payload)
   return { // ACTION
    type: GET_ALL_SPOTS,
    payload //array
   }
}


const updateSpot = (spotId) => {
   return { 
    type: UPDATE_SPOT,
    spotId 
   }
}

const deleteSpot = (spot) => {
   return { 
    type: DELETE_SPOT,
    spot 
   }
}

const getSpotById = (spot) => {
    // console.log("GET SPOT BY ID ACTION CREATOR", spot)
   return { 
    type: GET_SPOT_BY_ID,
    spot 
   }
}

const getUserSpots = user => {
    return {
        type: GET_USER_SPOTS,
        user
    }
}



// Thunk Action Creator
export const getAllSpotsThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
        method: "GET"
    })
    const data = await response.json();
    // console.log("data", data)
    dispatch(getAllSpots(data.allSpots))

    return data
}

export const getSpotByIdThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    const data = await response.json();
    // console.log("GET SPOT BY ID THUNK",data)
    dispatch(getSpotById(data))
    return data
}

export const createNewSpotThunk = (spotBody) => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(spotBody)
    })
    if( response.ok ){
        const data = await response.json()
        dispatch(createNewSpot(data))
        return data
    }
    // console.log("RESPONSESDFIJSODFKM",response)
    return response
}

export const updateSpotThunk = (spot, spotId) => async dispatch => {
    // console.log("UPDATE SPOT THUNK",spot)
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(spot)
    })
    if( response.ok ){
        const data = await response.json()
        // console.log("UPDATE SPOT THUNK DATA", data)
        dispatch(updateSpot(data))
        // return data
    }
    return response
}

export const deleteSpotThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`,{
        method: "DELETE"
    })
    if(response.ok){
        dispatch(deleteSpot(spotId))
    }
}


// REDUCER UPDATES STATE
const initialState = { spots: {}, spotById: {} };


const spotsReducer = (state = initialState, action) => {
    let newState = {};
    switch(action.type){
        case GET_ALL_SPOTS: {
            // normalize data. Turn array into obj
            action.payload.forEach(spot => {
                newState[spot.id] = spot // assign id of each spot to the spot obj
            })
            // console.log(action)
            // console.log("newState",newState)
            return newState
        }
        case CREATE_NEW_SPOT: {
            //TODO: not done
            newState = { ...state }
            // console.log("create action reducer",action)
            newState[action.payload.id] = action.payload
            // console.log("new state new spot",newState)
            return newState
        }
        case GET_SPOT_BY_ID: {
            newState = { ...state}
            // console.log("before",newState)
            newState[action.spot.id] = action.spot
            // console.log("after",newState)
            // console.log("GET SPOT BY ID REDUCER",action.spot)
            return newState
        }
        case DELETE_SPOT: {
            newState = {...state}
            delete newState[action.spot.id]
            return newState
        }
        case UPDATE_SPOT: {
            newState = { ...state}
            newState[action.spotId.id] = action.spotId
            return newState
        }
    default:
    return state;
    }
}

export default spotsReducer;