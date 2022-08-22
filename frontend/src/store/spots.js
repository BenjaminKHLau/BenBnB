import { csrfFetch } from "./csrf";


// Action Types
const CREATE_NEW_SPOT = "spots/CREATE"
const GET_ALL_SPOTS = "spots/READ"
const UPDATE_SPOT = "spots/UPDATE"
const DELETE_SPOT = "spots/DELETE"
const GET_SPOT_BY_ID = "spotsId/READ"



// Action Creator
const createNewSpot = (payload) => {
   return { 
    type: CREATE_NEW_SPOT,
    payload 
   }
}

const getAllSpots = (payload /* data.Spots */) => {
    console.log("payload", payload)
   return { // ACTION
    type: GET_ALL_SPOTS,
    payload //array
   }
}


const updateSpot = (payload) => {
   return { 
    type: UPDATE_SPOT,
    payload 
   }
}

const deleteSpot = (payload) => {
   return { 
    type: DELETE_SPOT,
    payload 
   }
}

const getSpotById = (payload) => {
   return { 
    type: GET_SPOT_BY_ID,
    payload 
   }
}




// Thunk Action Creator
export const getAllSpotsThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
        method: "GET"
    })
    const data = await response.json();
    console.log("data", data)
    dispatch(getAllSpots(data.allSpots))

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
    // return response
    console.log("RESPONSESDFIJSODFKM",response)
}


// REDUCER
const initialState = { spots: null };


const spotsReducer = (state = initialState, action) => {
    let newState = {};
    switch(action.type){
        case GET_ALL_SPOTS: {
            // normalize data. Turn array into obj
            action.payload.forEach(spot => {
                newState[spot.id] = spot // assign id of each spot to the spot obj
            })
            // console.log(action)
            return newState
        }
        case CREATE_NEW_SPOT: {
            //TODO: not done
            console.log(action)
            return newState
        }
    default:
    return state;
    }
}

export default spotsReducer;