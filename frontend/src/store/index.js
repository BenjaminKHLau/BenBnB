// frontend/src/store/index.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

//REDUCERS
import sessionReducer from './session';
import spotsReducer from './spots';

// State Stuff Here for Use Selector
const rootReducer = combineReducers({ 
  //bananable
  session: sessionReducer,
  spots: spotsReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };
  
  export default configureStore;



  /*
  TEST STUFF

  window.store.dispatch(window.sessionActions.login({
    credential: 'Demo-lition',
    password: 'password'
  }));

  */