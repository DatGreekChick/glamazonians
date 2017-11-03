import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import cart from './cart';
import products from './products';
import singleProduct from './singleProduct';
import reviews from './reviews';
import singleReview from './singleReview';
import addReview from './addReview';
import orders from './orders';
import singleOrder from './singleOrder';
import addProduct from './addProduct';

const reducer = combineReducers({
  user,
  cart,
  products,
  singleProduct,
  reviews,
  singleReview,
  addReview,
  orders,
  singleOrder,
  addProduct
});

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));
const persistedState = localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')) : {};

const store = createStore(reducer, persistedState, middleware);

store.subscribe(() => localStorage.setItem('store', JSON.stringify(store.getState())));

export * from './user'
export * from './cart';
export * from './products';
export * from './singleProduct';
export * from './reviews';
export * from './singleReview';
export * from './addReview';
export * from './orders';
export * from './singleOrder';
export * from './addProduct';
export default store;
