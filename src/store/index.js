import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


// import reducer1 from './reducer1';

const reducer = combineReducers({
//reducer variables go here
//reducer1
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    loggingMiddleware
  ))
);

export default store;

// export action creators
// export * from './reducer1'
