import { csrfFetch } from "./csrf";



// Action Types
const CREATE_NEW_REVIEW = "reviews/CREATE"
const GET_ALL_REVIEWS = "reviews/READ"
const UPDATE_REVIEW = "reviews/UPDATE"
const DELETE_REVIEW = "reviews/DELETE"
const GET_USER_REVIEW = "reviewsUser/READ"



// Action Creator
const createReview = (payload) => {
   return { 
    type: CREATE_NEW_REVIEW,
    payload 
   }
}

const getSpotReviews = (payload) => {
    // console.log("payload", payload)
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

const getUserReviews = (payload) => {
   return { 
    type: GET_USER_REVIEW,
    payload 
   }
}




// Thunk Action Creator
export const getSpotReviewsThunk = (spotId) => async dispatch => {
    console.log("spot review thunk",spotId)

    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "GET"
    })
    if (response.ok){
        const data = await response.json();
        // console.log("hello spot review data",data)
        dispatch(getSpotReviews(data))

        return data
    }

}

export const getUserReviewsThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/reviews/current`)
    if (response.ok) {
        const data = await response.json();
        dispatch(getUserReviews(data))
        return data
    }
}

export const createNewReviewThunk = (review, stars, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({review, stars})
    })
    if (response.ok){
        const data = await response.json()
        dispatch(createReview(data))
    }
    return response
}

export const deleteReviewThunk = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`,{
        method: "DELETE"
    })
    if (response.ok){
        dispatch(deleteReview(reviewId))
        
    }
    return response
}



// REDUCER
const initialState = { reviews: {} };


const reviewsReducer = (state = initialState, action) => {
    let newState = {};
    switch(action.type){
        case GET_ALL_REVIEWS: {
            action.payload.forEach(review => {
                newState[review.id] = review
            })
            // console.log("reducer review",review)
            return newState
        }
        case GET_USER_REVIEW: {
            action.payload.forEach(review => {
                newState[review.id] = review
            })
            return newState
        }
        case CREATE_NEW_REVIEW: {
            newState = { ...state }
            newState[action.payload.id] = action.payload
            console.log("reducer review",newState)
            return newState
        }
        case DELETE_REVIEW: {
            newState = {...state}
            delete newState[action.payload]
            return newState
        }
    default:
    return state;
    }
}

export default reviewsReducer;