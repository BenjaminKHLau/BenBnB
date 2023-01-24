// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpots from "./components/AllSpots";
import GetAllReviewsComponent from "./components/Reviews";
// import LoginFormPage from "./components/LoginFormModal";
import CreateSpotFormComponent from "./components/CreateNewSpot";
import GetSpotByIdComponent from "./components/GetSpotById"
import EditSpotFormComponent from "./components/EditSpot";
import GetUserSpotsComponent from "./components/GetUserSpots";
import CreateReviewFormComponent from "./components/Reviews/NewReview";
import GetUserReviewsComponent from "./components/Reviews/GetUserReviews";
import Footer from "./components/Navigation/Footer";
//BOOKINGS
import CreateBookingFormComponent from "./components/Bookings/CreateBooking";
import GetUserBookingsComponent from "./components/Bookings/UserBookings";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  

  const loggedInUser = useSelector(state => state.session.user)
  // console.log("check logged in user app.js",loggedInUser)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/spots/current">
           {loggedInUser ? <GetUserSpotsComponent /> : <Redirect to="/"/>}
          </Route>
          <Route exact path="/spots/:spotId">
            <GetSpotByIdComponent />
            {/* <CreateBookingFormComponent /> */}
            {/* <CreateReviewFormComponent /> */}
          </Route>
          <Route exact path="/reviews/current">
            <GetUserReviewsComponent />
          </Route>
          <Route exact path="/bookings/current">
            {/* <h1>Building in progress</h1> */}
            <GetUserBookingsComponent />
          </Route>
          {/* <Route path="/login">
            <LoginFormPage />
          </Route> */}
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          {/* <Route exact path="/spots">
            <CreateSpotFormComponent />
          </Route> */}

          <Route exact path="/">
            <GetAllSpots />
          </Route>
          <Route><h1>Page Not Found</h1><h2>Nothing to see here</h2></Route>


        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;