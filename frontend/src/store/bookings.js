import { csrfFetch } from "./csrf";

// Action Types
const CREATE_NEW_BOOKING = "bookings/CREATE"
const GET_ALL_BOOKINGS = "bookings/READ"
const UPDATE_BOOKING = "bookings/UPDATE"
const DELETE_BOOKING = "bookings/DELETE"
const GET_USER_BOOKINGS = "bookings/USER"

// Action Creator
const createNewBooking = payload => {
    return {
        type: CREATE_NEW_BOOKING,
        payload
    }
}

const getAllBookings = payload => {
    return {
        type: GET_ALL_BOOKINGS,
        payload
    }
}

const updateBooking = payload => {
    return {
        type: UPDATE_BOOKING,
        payload
    }
}

const deleteBooking = payload => {
    return {
        type: DELETE_BOOKING,
        payload
    }
}

const userBookings = payload => {
    return {
        type: GET_USER_BOOKINGS,
        payload
    }
}

// Thunk Action Creator 

export const createNewBookingThunk = (booking, spotId) => async dispatch => {
    console.log("NEW BOOKING THUNK", spotId)
    console.log("NEW BOOKING THUNK 2", booking)
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(booking)
    })
    if (response.ok){
        const data = await response.json()
        dispatch(createNewBooking(data))
        return data
    }
    return response
}

export const getAllBookingsThunk = (bookings) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${bookings}/bookings`)
    if (response.ok){
        const data = await response.json()
        dispatch(getAllBookings(data))
        return data
    }
    return response
}

export const getUserBookingsThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/bookings/current`)
    if (response.ok){
        const data = await response.json()
        dispatch(userBookings(data))
        return data
    }
    return response
}

export const deleteUserBookingThunk = (bookingId) => async dispatch => {
    // console.log("DELETE BOOKING THUNK BOOKING ID:", bookingId)
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "DELETE"
    })
    if(response.ok){
        dispatch(deleteBooking(bookingId))
    }
    return response
}

// REDUCER
const initialState = {};

const bookingsReducer = (state = initialState, action) => {
    let newState = {};
    switch(action.type){
        case GET_ALL_BOOKINGS: {
            newState = { ...state }
            action.payload.Bookings.forEach(booking => {
                newState[booking.id] = booking
            })
            return newState
        }
        case CREATE_NEW_BOOKING: {
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }
        case GET_USER_BOOKINGS: {
            newState = { ...state }
            action.payload.forEach(booking => {
                newState[booking.id] = booking
            })
            console.log("STATE IN GET USER BOOKINGS: ", newState)
            return newState
        }
        case DELETE_BOOKING: {
            newState = { ...state }
            console.log("DELETE BOOKING ACTION PAYLOAD", action.payload)
            delete newState[action.payload]
            return newState
        }
        default: return state;
    }
}

export default bookingsReducer;