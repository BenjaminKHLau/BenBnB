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


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  

  const loggedInUser = useSelector(state => state.session.user)
  console.log("check logged in user app.js",loggedInUser)
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
          <Route path="/spots/:spotId">
            <GetSpotByIdComponent />
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
          <Route exact path="/reviews">
            <GetAllReviewsComponent />
          </Route>
          <Route exact path="/">
            <GetAllSpots />
          </Route>
          <Route><h1>Page Not Found</h1><h2>Nothing to see here</h2></Route>


        </Switch>
      )}
    </>
  );
}

export default App;