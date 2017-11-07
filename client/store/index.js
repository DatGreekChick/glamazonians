import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import cart from './cart';
import order from './order';
import products from './products';
import product from './product';
import reviews from './reviews';

const reducer = combineReducers({
  user,
  cart,
  order,
  products,
  product,
  reviews,
});

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));
const persistedState = localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')) : {};

const store = createStore(reducer, persistedState, middleware);

store.subscribe(() => localStorage.setItem('store', JSON.stringify(store.getState())));

export * from './user';
export * from './cart';
export * from './order';
export * from './products';
export * from './product';
export * from './reviews';

export default store;
