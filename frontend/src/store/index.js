// frontend/src/store/index.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


// frontend/src/store/index.js
// ...
// const rootReducer = combineReducers({
// });


// frontend/src/store/index.js
// ...
import sessionReducer from './session';

const rootReducer = combineReducers({
  session: sessionReducer,
});
// ...

// frontend/src/store/index.js
// ...

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


// frontend/src/store/index.js
// ...

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };
  
  export default configureStore;


  //
  /*
  TEST STUFF

  window.store.dispatch(window.sessionActions.login({
    credential: 'Demo-lition',
    password: 'password'
  }));

  */