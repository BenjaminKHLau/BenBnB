import { csrfFetch } from "./csrf";


// Action Types
const CREATE_NEW_REVIEW = "reviews/CREATE"
const GET_ALL_REVIEWS = "reviews/READ"
const UPDATE_REVIEW = "reviews/UPDATE"
const DELETE_REVIEW = "reviews/DELETE"
const GET_REVIEW_BY_ID = "reviewsId/READ"



// Action Creator
const createNewReview = (payload) => {
   return { 
    type: CREATE_NEW_REVIEW,
    payload 
   }
}

const getAllReviews = (payload) => {
    console.log("payload", payload)
   return {
    type: GET_ALL_REVIEWS,
    payload
   }
}


const updateReview = (payload) => {
   return { 
    type: UPDATE_REVIEW,
    payload 
   }
}

const deleteReview = (payload) => {
   return { 
    type: DELETE_REVIEW,
    payload 
   }
}

const getReviewById = (payload) => {
   return { 
    type: GET_REVIEW_BY_ID,
    payload 
   }
}




// Thunk Action Creator
export const getAllReviewsThunk = () => async dispatch => {
    // const response = await csrfFetch(`/api/spots`, {
    //     method: "GET"
    // })
    // const data = await response.json();
    // console.log("data", data)
    // dispatch(getAllSpots(data.allSpots))

    // return data
}



// REDUCER
const initialState = { spots: {} };


const reviewsReducer = (state = initialState, action) => {
    let newState = {};
    switch(action.type){
        case GET_ALL_REVIEWS: {
            action.payload.forEach(review => {
                newState[review.id] = review
            })
            return newState
        }
    default:
    return state;
    }
}

export default reviewsReducer;